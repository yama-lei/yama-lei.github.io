---
date: 2025-01-10
---

# List

## Linked list 例题

>下面是linked list的ADT

###  the provided structure of link

```py
class Link:
    """A linked list.

    >>> s = Link(1)
    >>> s.first
    1
    >>> s.rest is Link.empty
    True
    >>> s = Link(2, Link(3, Link(4)))
    >>> s.first = 5
    >>> s.rest.first = 6
    >>> s.rest.rest = Link.empty
    >>> s                                    # Displays the contents of repr(s)
    Link(5, Link(6))
    >>> s.rest = Link(7, Link(Link(8, Link(9))))
    >>> s
    Link(5, Link(7, Link(Link(8, Link(9)))))
    >>> print(s)                             # Prints str(s)
    <5 7 <8 9>>
    """
    empty = ()

    def __init__(self, first, rest=empty):
        assert rest is Link.empty or isinstance(rest, Link)
        self.first = first
        self.rest = rest

    def __repr__(self):
        if self.rest is not Link.empty:
            rest_repr = ', ' + repr(self.rest)
        else:
            rest_repr = ''
        return 'Link(' + repr(self.first) + rest_repr + ')'

    def __str__(self):
        string = '<'
        while self.rest is not Link.empty:
            string += str(self.first) + ' '
            self = self.rest
        return string + str(self.first) + '>'
```

### Problem 2.1: Store Digits (100pts)
Write a function store_digits that takes in an integer n and returns a linked list where each element of the list is a digit of n. Your solution should run in Linear time in the length of its input.

**Note**: You may not use str, repr or reversed in your implementation.

```py
def store_digits(n):
    """Stores the digits of a positive number n in a linked list.

    >>> s = store_digits(0)
    >>> s
    Link(0)
    >>> store_digits(2345)
    Link(2, Link(3, Link(4, Link(5))))
    >>> store_digits(8760)
    Link(8, Link(7, Link(6, Link(0))))
    >>> # a check for restricted functions
    >>> import inspect, re
    >>> cleaned = re.sub(r"#.*\\n", '', re.sub(r'"{3}[\s\S]*?"{3}', '', inspect.getsource(store_digits)))
    >>> print("Do not steal chicken!") if any([r in cleaned for r in ["str", "repr", "reversed"]]) else None
    """
    "*** YOUR CODE HERE ***"
```
right solution 

```

def store_digits(n):
    """Stores the digits of a positive number n in a linked list.

    >>> s = store_digits(0)
    >>> s
    Link(0)
    >>> store_digits(2345)
    Link(2, Link(3, Link(4, Link(5))))
    >>> store_digits(8760)
    Link(8, Link(7, Link(6, Link(0))))
    >>> # a check for restricted functions
    >>> import inspect, re
    >>> cleaned = re.sub(r"#.*\\n", '', re.sub(r'"{3}[\s\S]*?"{3}', '', inspect.getsource(store_digits)))
    >>> print("Do not steal chicken!") if any([r in cleaned for r in ["str", "repr", "reversed"]]) else None
    """
    temp=Link(n%10)
    n//=10
    while n:
        temp=Link(n%10,temp)
        n//=10
    return temp
```
 

wrong solution

```py
def store_digits(n):
    """Stores the digits of a positive number n in a linked list.

    >>> s = store_digits(0)
    >>> s
    Link(0)
    >>> store_digits(2345)
    Link(2, Link(3, Link(4, Link(5))))
    >>> store_digits(8760)
    Link(8, Link(7, Link(6, Link(0))))
    >>> # a check for restricted functions
    >>> import inspect, re
    >>> cleaned = re.sub(r"#.*\\n", '', re.sub(r'"{3}[\s\S]*?"{3}', '', inspect.getsource(store_digits)))
    >>> print("Do not steal chicken!") if any([r in cleaned for r in ["str", "repr", "reversed"]]) else None
    """
    "*** YOUR CODE HERE ***"
    '''   if n<10:
        return Link(n)
    else:    
        temp=store_digits(n//10)
        head=temp
        while(temp.rest!=Link.empty):
            temp=temp.rest
        temp.rest=Link(n%10)
        return head
    '''
    if n<10:
        return Link(n)
    else:
        return Link(n%10,store_digits(n//10))
#顺序相反了
```
 

A right but inefficient solution
```py
def store_digits(n):
    if n < 10:
        return Link(n)
    else:
        temp = store_digits(n // 10)
        head = temp
        while temp.rest != Link.empty:
            temp = temp.rest
        temp.rest = Link(n % 10)
        return head
```
 



### Problem 2.2: Reverse (100 pts)
Write a function reverse which takes in a linked list lnk, reverses the order of it and returns the reversed list(i.e. return a new reference to the head of the reversed list). Your implementation should mutate the original linked list. DO NOT create any new linked lists.

You may not just simply exchange the first to reverse the list. On the contrary, you should make change on rest.

There is more than one way to solve this problem. Can you come up with more solutions?

    def reverse(lnk):
        """ Reverse a linked list.
    >>> a = Link(1, Link(2, Link(3)))
    >>> # Disallow the use of making new Links before calling reverse
    >>> Link.__init__, hold = lambda *args: print("Do not steal chicken!"), Link.__init__
    >>> try:
    ...     r = reverse(a)
    ... finally:
    ...     Link.__init__ = hold
    >>> print(r)
    <3 2 1>
    >>> a.first # Make sure you do not change first
    1
    """
    "*** YOUR CODE HERE ***"
solution1 using loop

```
def reverse(lnk):
    """ Reverse a linked list.
    >>> a = Link(1, Link(2, Link(3)))
    >>> # Disallow the use of making new Links before calling reverse
    >>> Link.__init__, hold = lambda *args: print("Do not steal chicken!"), Link.__init__
    >>> try:
    ...     r = reverse(a)
    ... finally:
    ...     Link.__init__ = hold
    >>> print(r)
    <3 2 1>
    >>> a.first # Make sure you do not change first
    1
    """
    "*** YOUR CODE HERE ***"
    if lnk==Link.empty:
        return lnk
    else:
        prev,curr,next=Link.empty,lnk,Link.empty
        while curr!=Link.empty:
            next=curr.rest
            curr.rest=prev
            prev=curr
            curr=next
        return prev    # return the prev node
```
 

solution2 using recursion

```
def reverse(lnk):
    """ Reverse a linked list.
    >>> a = Link(1, Link(2, Link(3)))
    >>> # Disallow the use of making new Links before calling reverse
    >>> Link.__init__, hold = lambda *args: print("Do not steal chicken!"), Link.__init__
    >>> try:
    ...     r = reverse(a)
    ... finally:
    ...     Link.__init__ = hold
    >>> print(r)
    <3 2 1>
    >>> a.first # Make sure you do not change first
    1
    """
    "*** YOUR CODE HERE ***"
    def helper(lnk,prev=Link.empty):
        if lnk==Link.empty:
            return prev
        else:
            next=lnk.rest
            lnk.rest=prev
            return helper(next,lnk)
    return helper(lnk)
```
---

## 与python list相关的操作



 >尤其注意：`append`,`+`,`extend`  在修改(mutate)数组时的区别

| Method/Function      | Description                                                  | Example Input               | Resulting List/Output       |
| -------------------- | ------------------------------------------------------------ | --------------------------- | --------------------------- |
| **`append(x)`**      | Adds a single element `x` to the end of the list.            | `[1, 2, 3].append(4)`       | `[1, 2, 3, 4]`              |
| **`extend(iter)`**   | Adds all elements of an iterable `iter` to the end of the list. | `[1, 2, 3].extend([4, 5])`  | `[1, 2, 3, 4, 5]`           |
| **`insert(i, x)`**   | Inserts element `x` at index `i`.                            | `[1, 2, 3].insert(1, 10)`   | `[1, 10, 2, 3]`             |
| **`remove(x)`**      | Removes the first occurrence of element `x`.                 | `[1, 2, 3, 2].remove(2)`    | `[1, 3, 2]`                 |
| **`pop([i])`**       | Removes and returns the element at index `i` (defaults to the last element). | `[1, 2, 3].pop(1)`          | `2` (list becomes `[1, 3]`) |
| **`clear()`**        | Removes all elements from the list.                          | `[1, 2, 3].clear()`         | `[]`                        |
| **`index(x)`**       | Returns the index of the first occurrence of element `x`.    | `[1, 2, 3, 2].index(2)`     | `1`                         |
| **`count(x)`**       | Returns the number of occurrences of element `x`.            | `[1, 2, 2, 3].count(2)`     | `2`                         |
| **`sort()`**         | Sorts the list in ascending order (in-place).                | `[3, 1, 2].sort()`          | `[1, 2, 3]`                 |
| **`reverse()`**      | Reverses the elements of the list in-place.                  | `[1, 2, 3].reverse()`       | `[3, 2, 1]`                 |
| **`copy()`**         | Returns a shallow copy of the list.                          | `[1, 2, 3].copy()`          | `[1, 2, 3]` (new list)      |
| **`len(list)`**      | Returns the number of elements in the list.                  | `len([1, 2, 3])`            | `3`                         |
| **`sum(list)`**      | Returns the sum of all elements in the list.                 | `sum([1, 2, 3])`            | `6`                         |
| **`min(list)`**      | Returns the smallest element in the list.                    | `min([1, 2, 3])`            | `1`                         |
| **`max(list)`**      | Returns the largest element in the list.                     | `max([1, 2, 3])`            | `3`                         |
| **`sorted(list)`**   | Returns a new sorted list (does not modify the original).    | `sorted([3, 1, 2])`         | `[1, 2, 3]`                 |
| **`reversed(list)`** | Returns a reverse iterator (use `list()` to convert to a list). | `list(reversed([1, 2, 3]))` | `[3, 2, 1]`                 |
| **`list(iter)`**     | Converts an iterable (e.g., tuple, string) to a list.        | `list((1, 2, 3))`           | `[1, 2, 3]`                 |
| **`del list[i]`**    | Deletes the element at index `i`.                            | `del [1, 2, 3][1]`          | `[1, 3]`                    |
| **`list[i:j]`**      | Slices the list from index `i` to `j-1`.                     | `[1, 2, 3, 4][1:3]`         | `[2, 3]`                    |
| **`list + list`**    | Concatenates two lists.                                      | `[1, 2] + [3, 4]`           | `[1, 2, 3, 4]`              |
| **`list * n`**       | Repeats the list `n` times.                                  | `[1, 2] * 2`                | `[1, 2, 1, 2]`              |

---

 