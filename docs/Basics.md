<!--{
    "title": "Go" ,
    "author": "Ishaan",
    "tags": ["Go", "Golang", "Programming Language"]
}-->

# Basics

$$ f(x) = x^2 $$

## Declaration

In package scope everything must have a keyword - func, var. Use "var" to declare a variable or use ":=" short-assignment operator.

``` Go
package main

var num int = 4
const Pi = 3.14 // constants - cannot use := for them
const day string = "Monday"

var (
    num2 = 5
    str string // default is ""
)

func declareStuff() {
    num3 := 6 // can use short assignment here.
    str2 := "hi"
}
```

## Types

* bool
* string
* int  int8  int16  int32  int64
* uint uint8 uint16 uint32 uint64 uintptr
* byte // alias for uint8
* rune // alias for int32
     // represents a Unicode code point
* float32 float64
* complex64 complex128

An "int", "unint", "uintptr" are 64 or 32 bits depending on the machine.

### Default Values

0 for numeric types, false for the boolean type, and
"" (the empty string) for strings.

### Type Conversions

Go requires explicit type conversions unlike C.

``` Go
var i int  = 42
var f float64 = float64(i)
// or f := float64(i)
var u uint = uint(f)
// Hence 
var f float64 = i // this would be an error
```

When using := (short assignment) the type pf the variable depends on the **precision** of the literal. Example - 42 : int, 3.142 : float64, 0.86 + 0.5i : complex128

## Control Structures

### Loops

``` Go
// for loop
for i := 0; i < 10; i++ {
    sum += i
}
// init and post statements are optional
for ; x < 100; {
    //do something
}
// While in C is without init and post statements
for x < 1000 {
    // this is a while loop!
}
```

### Branching
``` Go
if x < 0 {
    fmt.Println("number is negative")
}
// you can add a statement in if
if v := math.Pow(x, n); v < lim {
    // v is scope of if
}
```