---
date: 2025-01-18
---

# sicp笔记

## !!!考前注意：

  1. 注意不要破坏抽象：比如scheme list要用对应的constructor和selector不要用car，cons
  2. 注意在继承的时候，能调用super().method就尽量调用
  3. 注意是list of lists 还是list！
  4. 降序排列是DESC，升序不用写  
  5. 如果是print or repr 某一个由instance组成的list， 里面的每一个instance都会被repr作用；而不是str！！！！！！！！！
  6. 注意看题目要求要的是什么！不要只看doctest。

### 我的精神状态belike： 
![](https://img2024.cnblogs.com/blog/3578676/202412/3578676-20241231183714559-1474398211.jpg)

## 1.The difference between quoted and unquoted string

```python
>>>print('hello world')
hello world #unquoted
>>>a='hello world'
>>>a    #It is the same if you want to look up an attribute of an 
        #instance(or class) and the attribute is a string;
'hello world' #quoted
```
And one more strange thing:
```py
class A:
  def __init__(self,x):
      self.x=x
  def __repr__(self):
      return self.x
  def __str__(self):
      return self.x
>>>print(A('10'))
10  #注意这里不能是print(A(10))因为 str的返回值不能是非str的
>>>A('10')       #inexplictly call __repr__
10
>>>repr(A('10')) #explictly call __repr__
'10'
#经助教提醒后幡然醒悟：前面那个显示10并不意味着repr(A('10'))为10，而是经过了Read-Eval-Print-Loop之后才显示为10。
```

## 2.Attribute lookup:

```py
class Car:
  def __init__(self):
      pass
class electric_car(Car):
    def get_charged(self):
        pass
A=electric_car()
Car.get_charged(A) #Error!
#search the function 'get_charged' from the class Car, but failed.
electric_car.get_charged(A) 
#equals to A.get_chaeged()
```

## 3.Super method: 'super' is a method that allows you to call the method of superclass.

>**Method Binding**
>When you call a method using super(), the method is bound to the current instance (i.e., self), not to the temporary proxy object. This is why the method has access to the instance’s attributes and can modify them. --from deepseek V3

```
class electric_car(Car):
    def __init__(self):
        super().__init__()
#you don't have to take 'self' as a parameter, because it is bound already
    def get_charged(self):
        pass
```

##4.Handle string format with for expression:
>hint: you are recommended to read the manual about string function like join, format ,zfill,and so on;
```py
#example 1
def shift(x,str):
  return "".join([(ord(ch)-ord('a')+x)%26+ord('a')] for ch in message)
#shift all the letter back by x
```

```py
#example 2
def time_format(year,month,day,format="yy.mm.dd"):
    return format.replace("yy",str(year)).replace("mm",str(month).zfill(2)).replace("dd",str(day).zfill(2))
#  original_str.replace(old_substr,new_str);
#  str.zfill(width) => fill zeros ahead of the str;
```
```py
#example 3
def fliiter_index(str,x):
   #flitter out the letters whose indices are the multiple of x (excluding 0)
  return "".join(str[index] if index==0 or index%x!=0 else "" for index in range(len(str)))
  
```
##5. **special method**
There are some special methods like '__radd__','__rsub__', but when they are called? 

>These methods are called to implement the binary arithmetic operations (+, -, *, @, /, //, %, divmod(), pow(), **, <<, >>, &, ^, |) with reflected (swapped) operands. These functions are only called if the left operand does not support the corresponding operation 3 and the operands are of different types. 4 For instance, to evaluate the expression x - y, where y is an instance of a class that has an __rsub__() method, y.__rsub__(x) is called if x.__sub__(y) returns NotImplemented.
>[https://docs.python.org/3.9/reference/datamodel.html?highlight=radd#object.__radd__]()

```py
class num1:
    def __init__(self,num):
        self.num=num
    def __add__(self,other):
        return num1(self.num+other.num)
    def __radd__(self,other):
        return num1(2*self.num+other.num)
    def __str__(self):
        return f"the value is {self.num}"
class num2:
    def __init__(self,num):
        self.num=num
    def __add__(self,other):
        return num1(self.num+other.num)
    def __radd__(self,other):
        return num1(2*self.num+other.n)
n1=num1(1)
n2=num2(2)
print(n1+n2)  # the value is 3
print(n2+n1)  # the value is 4
# first: check if the __add__ method of the left operand is able to work
# second: if them are the same type, then an error occurs (it's no use even if you change their position) otherwise, the __radd__ method of the right operand is called 
```


## 6.Scheme
- Everything is considered `#t` (true) except `#f` (false).
- `or` evaluates its arguments from left to right and returns the first truthy value.
If all arguments evaluate to `#f`, it returns `#f`.
- `and` evaluates its arguments from left to right and returns the first falsy value.
If all arguments are truthy, it returns the last truthy value.
- use `eq?` or `equal?` to compare symbol and number; `=`  can only be used to compare number!
- `pair?`:return `#t` when operand is a pair (or list); In python we use` isinstance(lnk,Link)`

##7.Interpreter
- REPL:'read-eval-print-loop'
- environment is often representated as a dictionary;
  To check if the dict has key 'a' use:`a in dict.keys()`
  To add a new key-value bound or change the value use: `dict[key]=value` 
  To delete a key-value bound use: `del dict[k]`

## 8.Define Macro in Scheme
 ###  The ensence of marco procedure: Code Transformation

```scm
(define-macro (f x) (+ x 2))
(f (+ 2 3))
(define-macro (g x) (list '+ x 2))
(g (+ 2 3)）
```
`(f (+ 2 3))` will apply the macro function f with the value `'(+ 2 3)` as `x`. It will try to `(+ '(+ 2 3) 2)` of which the result is the new code that replaces the whole `(f (+ 2 3))` entirely. However + cannot add a list to a number so it makes no sense to create a macro like that.
>######Take the source code as-is(add a quotation before it so when it is changed and evaled it is represented as-is) 

`(g (+ 2 3))` will apply the macro function g with the value `'(+ 2 3)` as `x`. It will try to `(list '+ '(+ 2 3) 2))` of which the result is `(+ (+ 2 3) 2)`. This is then put verbatim at the code location of `(g (+ 2 3))` as if it has always been `(+ (+ 2 3) 2)` all along before the program starts executing. It works because `(+ (+ 2 3) 2)` is a valid expression.

## 9. Scheme List
 Problem 1: Count Change III (100 pts)
Write a procedure make-change, which takes in positive integers total and biggest and outputs a list of lists, in which each inner list contains positive numbers no larger than biggest that sum to total.

>Note: Both outer list and inner lists should be descending ordered.
> Hint: You may find Scheme built-in procedure append useful.
```scm
(define (make-change total biggest)
  'YOUR-CODE-HERE
)

;;; Tests
; scm> (make-change 2 2)
; ((2) (1 1))
; scm> (make-change 3 3)
; ((3) (2 1) (1 1 1))
; scm> (make-change 4 3)
; ((3 1) (2 2) (2 1 1) (1 1 1 1))
```
**Solution**:
```
(define (make-change total biggest)
  (cond ((= total 0) '(()) )       ;A right path 
    (or (< total) (= biggest 0) '() ) ;Invalid path, should be ingnored
    (else
        (let ((with (map (lambda (lst) (cons biggest lst)) (make-change (- total biggest) biggest) )  ) 
         (without (make-change total (- biggest 1))))
        (append with without)
        )
  )
)
```
## 10. Scheme Macro

>由于尚未完全掌握 暂时不完全展示
--------------

## 11. Scheme Stream

  - **A Speacial data type**
  ```scm
  ;the following are the constructor and selector of Stream:
  (define (cons-stream first rest)
      (cons first (delay rest))
  )
  (define (cdr-stream s)
  (force (cdr s))
)
  ```
<details>
<summary>More demo</summary>

```scm
(define (constant-stream i) (cons-stream i (constant-stream i)))

(define (slice s start end)
    (if  (and (< start end) (not (null? s)) )
         (if (and (= 0 start))
            (cons (car s) (slice (cdr-stream s) start (- end 1)) )
            (slice (cdr-stream s) (- start 1) (- end 1))
            )        
        nil
    )
)

(define (add-stream s1 s2) 
    (cond 
        ((null? s1) s2)
        ((null? s2) s1)
        (else (cons-stream (+ (car s1) (car s2)) (add-stream  (cdr-stream s1) (cdr-stream s2) )) )
     )
)

(define (merge-stream s1 s2)
    (cond 
         ((null? s1) s2)
         ((null? s2) s1)
         (else 
            (if (> (car s1) (car s2))
                (cons-stream (car s2) (merge-stream (cdr-stream s2) s1))
                (cons-stream (car s1) (merge-stream (cdr-stream s1) s2))
            )   
         )
    )
)

(define (map-stream fn stream )
    (if (null? stream)
        nil
        (cons-stream (fn (car stream)) (map-stream fn (cdr-stream stream)))
    )
)

(define (filter-stream fn stream)
    (if (null? stream) nil
        (if (fn (car stream))
            (cons-stream (car stream) (filter-stream fn (cdr-stream stream)))
            (filter-stream fn (cdr-stream stream))
        )    
    )
)

(define (nats start) (cons-stream start (nats (+ start 1))))
(define natuals (nats 0))
(define ones (constant-stream 1))
(define s1 (cons-stream 1 (cons-stream 2 (cons-stream 3 (cons-stream 4 nil)))))

```
</details>

- What 's wrong with the code?
```scm
(define (filter-stream f s)
  (if (null? s) nil
      (let ((rest (filter-stream f (cdr-stream s))))
        (if (f (car s))
            (cons-stream (car s) rest)
            rest))))
```
>**Tips**: To get `rest` you have to get the result of the recursive call `(filter-stream f (cdr-stream s)))`, so it is not a lazy evaluation.

- The most beautiful part of Stream lies in its power of creation: you can design many streams by some simple streams
  Take `factorial` as an example: 
  We konw the factorials of naturals are 1 1 2 6 24 120...(start by 0!) 
  Given a stream of nuturals :1 2 3 4 5 ...
  And we may found that if we combine  the two streams by multiple their corresponding element, we may get a new stream :1 2 6 24 120 720.... (1 * 1=1, 1 * 2=2, 2 * 3=6...)
  And apperently, it is just part of the factorial stream, 
  so the factorail stream can be defined recursively:
      
  - the first element is 1 
  - the rest are the `combination` of stream `naturals`  and the stream `factorials`
>It's Beautiful! Right?

更一般地：
```scm
  （define sum-stream 
      (cons-stream (car an-stream)  
          (add-stream sum-stream (cdr-stream an-stream)
      )
    )
;即,Sn+1=Sn+an+1;
```
 - **More demos**:

#Problem 4: Non Decreasing (100 pts)
Define a function nondecrease, which takes in a scheme stream of numbers and outputs a stream of lists, which overall has the same numbers in the same order, but grouped into lists that are non-decreasing.

For example, if the input is a stream containing elements

(1 2 3 4 1 2 3 4 1 1 1 2 1 1 0 4 3 2 1)
the output should contain elements

((1 2 3 4) (1 2 3 4) (1 1 1 2) (1 1) (0 4) (3) (2) (1))
Your solution may handle infinite streams correctly, which means if an infinite streams is always non-decreasing after the nth element, and from the 0th to the n - 1th element can group to m non-decreasing sublists, your solution can output the first m sublists correctly.


(define (nondecrease s)
  'YOUR-CODE-HERE
)

;;; Tests
; scm> (define s (list-to-stream '(1 2 3 4 1 2 3 4 1 1 1 2 1 1 0 4 3 2 1))) ; a helper function to make stream from list
; s
; scm> (slice (nondecrease s) 0 8)
; ((1 2 3 4) (1 2 3 4) (1 1 1 2) (1 1) (0 4) (3) (2) (1))
<details>
<summary>solution1</summary>

```scm
(define (non-decreasing stream)
    (cond ( (null? stream) (cons-stream nil ni) )
        ( (null? (cdr-stream stream)) (cons-stream (cons (car stream) nil) nil))
        (else 
            (let ((next (non-decreasing (cdr-stream stream))))
                (if (<= (car stream) (car (car next)))
                    (cons-stream (cons (car stream) (car next))  (cdr-stream next))
                    (cons-stream (cons (car stream) nil) next)
                    )     
            )
        )
    )
)
;
```
</details>

>The main idea of solution one is take out the first element(`car stream`) and 'add' it to the result without it(recursively,`(non-decreasing (cdr-stream s)`) 
<details>
<summary>solution2 from chatgpt</summary>

```
(define (non-decreasing stream) 
    (define (take-group stream)
        (cond ((null? stream) nil)
               ((null? (cdr-stream stream)) (cons (car stream) nil))
            (else (if (<= (car stream) (car (cdr-stream stream) ) ) 
                         (cons (car stream) (take-group (cdr-stream stream)))
                         (cons (car stream)  nil)
                    ))
        )    
    )
    (define (next-stream stream)
            (cond ((null? stream) nil)
                  ((null? (cdr-stream stream)) stream )
                  ((< (car stream) (car (cdr-stream stream))) (next-stream (cdr-stream stream)) )
                  (else (cdr-stream stream))
                  )
        )
    (if (null? (take-group stream)) nil (cons-stream (take-group stream) (non-decreasing (next-stream stream))))
)

```
</details>

> Main idea: `take-group` from the current stream and recursively take the group from the `next-stream`


##12. SQL

  - Create a tabel:
      ```sql  
      CREATE TABLE name AS:
          SELECT 'content' AS coulmn_name UNION
          .....
      ```

  - Select:
      ```sql  
      SELECT column FROM table_name AS column_name WHERE condition ORDER BY column LIMINT maximun_num
      
      ```
    在ORDER BY col 后面可以加上 ASC或DESC，否则默认ASC；
  - Joining tabels:
      ```sql  
      SELECT col FROM table1,table2 WHERE condition.....
      ```
   - Aggregation
      ```c
      1.GROUP BY 
      2.COUNT(*):计算所有列数，COUNT(DISTINCT col)计算不同col那一列地不同值的个数
      3.MAX(col),MIN(col)
      4. 
      ```
 - **Some common Aggregation function:**
    ![](https://img2024.cnblogs.com/blog/3578676/202501/3578676-20250103083236722-333088327.png)

##14. Others
 - Scheme Diagram:  





  - Draw Lists:
      - 自行体会：
    ![](https://img2024.cnblogs.com/blog/3578676/202501/3578676-20250103085651349-898535439.png)
  
  - Environment, Frame:
    Notice： Whenever you call a function, you create a new frame, whose parent is the frame where the function is defined. In the following example, the function `make-adder` is defined in the global frame, when call the function by `(make-adder 3)`, a new frame `f1` is created and returnd a lambda function (defined in `f1`). And later when you call the function `add-three` which is bound to the lambda function, new frames are created, more specifically `f2` and `f3`.The parent frame of `f2` and `f3` is `f1`, because the lambda is define in `f1`;
  >But `add-there` is defined in Global Frame, why is their parent frame not the Global Frame?  When evaluating the call expression, the operator is evaluated first, which results in  a lambda procedure. Therefore the parent frame of the function call is the frame in which  the lambda procedure was defined.

  ![](https://img2024.cnblogs.com/blog/3578676/202501/3578676-20250103090205733-663837540.png)

   - Some Scheme procedure/SQL function often ignored:
      - `modulo` 取模
      - `quotident` 整除
      - `equal?` or `eq?` 用于比较数字和非数字是否相等(`=`只用作数字之间的比较)
      - `Round` (SQL aggregation Function) 四舍五入
      - `AVG`  (SQL aggregation Function)  对group取平均值，注意，如果没有用GROUP BY 但是用了aggregation function，则认为是对整个的table当成是一个group；

## 15. Interpreter

  - Counting：考试会考！
    - 这个是built-in procedure  
    ![](https://img2024.cnblogs.com/blog/3578676/202501/3578676-20250103094500138-224050086.png)
    - 这个是 user-defined procudure(`LambdaProcedure`)
    ![](https://img2024.cnblogs.com/blog/3578676/202501/3578676-20250103094635619-1657772481.png)
  >Pay attention to the eval process: you have to eval the exprssion in the body of the function.

  - WWSP
   ```scm
   >>>scm (cons '(car) '('(1 2)))
    (car (quote (1 2)))
   ;解释：'(car) ->Pair(car) '('(1 2))->Pair(Pair(quote, Pair(1, Pair(2,nil))))
  当调用cons的时候，需要先eval operand，分别得到car和Pair(quote,Pair(1, Pair(2, nil)))
   再用cons创建一个pair-> Pair(car, Pair(quote, Pair(1, Pair(2,nil))))
  >>(eval (cons '(car) '('(1 2))) )
  1
  ;解释，在上述的基础上再调用eval，发现Pair第一个是procedure（car）,因此按function call来，分别evaluate opertor 和operand，期中operand得到(1 2)
   ```