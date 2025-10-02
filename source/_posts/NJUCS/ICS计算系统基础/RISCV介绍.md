---
date: 2025-09-30
title: Riscv介绍
categories:
  - NJUCS
  - ICS计算系统基础
---
RISCV：开源，Load/Store形式
指令有R-type，I-type，S-type，U-type，B-type，J-type等类型
![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20250930143543.png)


推荐[RISC-V 指令集参考手册](https://ai-embedded.com/risc-v/riscv-isa-manual/)来了解这个相关指令
在riscv里面将a0-a1作为返回值寄存器，如果是是32位就只需要a0，如果是64位那就需要64位，如果是更大的，那么存入栈中，并且放回地址（对应x86的eax）
sp相当于是x_86的esp（栈顶指针）
在x86中放回地址是压入栈中，然后跳转，但是在riscv中
（在x86中，call指令会push return addr并且跳转，ret指令先pop返回指令，再跳转，这里的跳转指的是修改栈顶指针）
而在riscv中使用寄存器进行保存

![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20250930142644.png)
（图为riscv的寄存器和对应的abi name，以及描述相关内容）

---
## Instructions
### Arithmetic Instructions

1. add rd rs1 rs2
    - 将寄存器 `rs1` 和 `rs2` 中的值相加，结果写入 `rd`。
    - 有符号整数加法，若溢出则**不触发异常**，结果直接截断（由软件处理）。
2. addi rd rs1 imm12
    - 立即数 `imm12` 进行**符号扩展**（SEXT）后与 `rs1` 相加，结果存入 `rd`。
    - `imm12` 的范围是  到 ，即  到 。
3. slti t0 s2 15
    - 若 `s2 < 15`（有符号比较），则 `t0 = 1`；否则 `t0 = 0`。
    - 该指令用于**有符号立即数比较**，常用于条件判断前的预处理。
4. lui t0 imm20
    - 将 `imm20` 的高 20 位加载到 `t0` 的高 20 位，低 12 位清零。
    - 用于构建大立即数的高段部分。
    - 低 12 位可通过 `addi` 或 `ori` 补齐：
        
        ```asm
        lui t0, 0x12345      # t0 = 0x12345000
        addi t0, t0, 0x678    # t0 = 0x12345678
        ```

---

### Shift Operations

1. slli t2 s0 8
    - 将 `s0` 左移 8 位，逻辑左移（低位补 0），结果存入 `t2`。
    - 用于快速乘以 。
2. srli t2 s0 8
    - 将 `s0` 右移 8 位，逻辑右移（高位补 0），结果存入 `t2`。
    - 用于无符号除以 。

> ⚠️ 注意：RISC-V 还提供算术右移指令 `srai`，用于有符号数右移（高位补符号位），但未列出。

---

### Logic operations

1. and rd rs1 rs2
    - 按位与操作，`rd = rs1 & rs2`。
    - 属于 R 型指令，操作码为 `0110011`，功能由 `funct3` 决定。
2. andi rd rs1 imm12
    - 立即数 `imm12` 经符号扩展后与 `rs1` 按位与，结果存入 `rd`。
    - 以 `i` 结尾表示 I 型指令，立即数参与运算。

> ✅ 提示：`or`, `ori`, `xor`, `xori` 同理，均为基本逻辑运算，I 型用于立即数，R 型用于寄存器间操作。

---

### Memory access instructions

在 RISC-V 中，一个 **word 是 32 位（4 字节）**，地址按字节寻址（byte-addressable）。  
在 x86 中：

- `w` 表示 16 位（2 字节）
- `l` 表示 32 位（4 字节）
- `b` 表示 8 位（1 字节）
- `q` 表示 64 位（8 字节）

1. load 指令 `lw t0 12(s1)`
    
    - 从内存地址 `s1 + 12` 读取一个 32 位字（word），存入 `t0`。
    - 地址计算：`addr = R[s1] + SEXT[imm12]`（`imm12` 为 12 位立即数，符号扩展为 32 位）。
    - **寄存器中左边是高字节，右边是低位**（无论 RISC-V 还是 x86，都遵循此规则）。
    - **端序问题**：
        - 大端（Big Endian）：低地址 → 高字节，存储顺序自然。
        - 小端（Little Endian）：低地址 → 低字节（LSB），因此数据在寄存器中需**反向排列**。
        - RISC-V 默认采用小端模式（可配置），因此在内存中 LSB 存在低地址，加载时自动完成字节重组。
2. store 指令 `sb t0 6(t3)`
    
    - 将 `t0` 的低 8 位（即最低字节）写入内存地址 `t3 + 6`。
    - 用于存储单个字节（byte）。
    - 类似地，还有 `sh`（半字，16 位）、`sw`（字，32 位）。

---

### Control Flow Instructions

在 x86 中，控制流通过将状态（如标志位 ZF、CF、SF）存于 **EFLAGS 寄存器**中实现。  
这些标志位反映上一条指令执行后的结果（如是否为零、是否进位、是否负数），后续条件跳转指令（如 `je`, `jg`, `jl`）根据这些标志位决定是否跳转。

在 RISC-V 中，**没有 EFLAGS 寄存器**，控制流依赖于**显式比较与跳转指令**：

1. `bne rs1 rs2 imm12`
    
    - 若 `rs1 ≠ rs2`，则 PC ← PC + SEXT[imm12] × 2。
    - `imm12` 乘以 2 是因为 RISC-V 指令按字（4 字节）对齐，偏移量以字为单位，但立即数以字节为单位编码，故需左移 1 位（×2）。
2. `beq rs1 rs2 imm12`
    
    - 若 `rs1 == rs2`，则跳转。
    - 与 `bne` 互补，是基本条件跳转指令。

> 🔍 如何实现“小于”跳转？  
> RISC-V 无 `blt` 指令（但可作为伪指令使用），需组合实现：
> 
> ```asm
> slt t0, s1, s2    # t0 = 1 if s1 < s2 (signed), else 0
> bne t0, zero, label  # 若 t0 ≠ 0，则跳转
> ```
> 
> - `slt` 执行有符号比较。
> - 若 `s1 < s2`，则 `t0 = 1`，`bne` 成立，跳转。
> - 可类似构造：`bge`, `ble`, `bgt`, `bgeu`, `bltu` 等（通过 `sltu` 实现无符号比较）。

> 📌 说明：`blt`、`bge` 等是汇编伪指令，实际由 `slt` + `bne` 实现。

3. `jal rd, imm20`
    
    - **Jump and Link**：跳转并保存返回地址。
    - 将当前 PC + 4 存入 `rd`（通常为 `ra`），然后跳转到 `PC + SEXT[imm20] × 2`。
    - `imm20` 乘以 2 是因为指令对齐（每条指令 4 字节），偏移量以字为单位。
4. 伪指令 `j label`
    
    - 可用 `jal zero, label` 实现：
        
        ```asm
        jal zero, label   # 跳转，不保存返回地址（zero 恒为 0）
        ```
        
    - 适用于无返回需求的跳转。


### 技巧
1. mov操作，使用addi，加一个0即可实现mov
2. 为什么往内存里面送的时候没有区分unsigned和signed呢？因为内存里面都是按照字节编码的，要存多少个字节就申请多少个字节，不像寄存器可能需要把16位的数据存入32位的指令才需要用到
## Steps in Execution of Procedure

jal调用函数  
jal ra gcd  
callee执行后，使用jalr来返回  
jalr x0 0(ra) # gcd中计算的结果存储在约定好的寄存器中  
（请你详细的讲讲在x86和riscv中不同的调用过程）  

|步骤|RISC-V|x86|  
|---|---|---|  
|调用|`jal ra, func` → 保存返回地址到 `ra`|`call func` → 把返回地址**压入栈**|  
|返回|`jalr x0, 0(ra)` → 从 `ra` 跳回|`ret` → 从栈里**弹出**返回地址并跳转|
## Heap的内存分配
内存只有Stack（从高地址向低地址增长），Heap（从低到高增长），Static Data， Text（my code），Reversed（保留区）
PC执行代码段中正在执行的指令

在运行的过程中elf文件被移动到内存中，static区域中有：.data是初始化全局变量的，.bss区域是没有初始化的全局变量


