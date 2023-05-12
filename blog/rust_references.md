---
title: "All you need to know about Rust references!"
excerpt: "In Rust, you need to be mindful of the ownership model, which means there can only be one owner at a given time for the data in memory. But what if we need to perform some operations on that data by passing it to a function but still need to retain the ownership? There are two ways to achieve this."
coverImage: "/assets/blog_images/rust_references.webp"
date: "2023-05-03T18:20:32Z"
edited: "2023-05-09T05:57:00Z"
author:
    name: Gaurarvjot Garaya
ogImage:
    url: "/assets/blog_images/rust_references_thumb.webp"
---

The first method is to transfer the ownership to the function and then take it back. Here is a quick example:

```rust
// ownership goes from s1 -> some_function -> s2
fn main() {
  let s1 = String::from("hello");
  let s2 = some_function(s1); // s2 will now have ownership of "hello"
}

fn some_function(a_string: String) -> String {
  …
  a_string // return string and ownership
}
```

The second method is to use a reference.

### Referencing

Referencing, or in Rust terminology ‘_Borrowing_’, is represented with `&` sign. Referencing allows you to pass the value of a variable without passing its ownership. Here is an example:

```rust
let s1 = String::from("hello");
let len = calculate_length(&s1);
```

The function `calculate_length()` has value of `s1` passed to it but ownership continues to be held by `s1`. Notice that `&s1` is the syntax for telling Rust that we want to pass the object by reference to the function.

The function defination will also need to reflect that it is supposed to receive a reference. Notice the `&String` that tells that `s` will have to be passed by reference.

```rust
fn calculate_length(s: &String) -> usize { // s is a reference to a String
    s.len()
}
```

Now when the function ends, `s` is not dropped from memory as the function does not have ownership to it.

### Mutating borrowed value

If you try changing value of our reference `s` you will see that it will result in an error. By design, referenced or borrowed object can only be read and not mutated.

```text
error[E0596]: cannot borrow `*s` as mutable, as it is behind a `&` reference
```

If your use case requires you to mutate the borrowed value then you will have to explicitly tell the compiler. Here is an example on just how to do that.

```rust
let mut s1 = String::from("hello");
let s2 = change(&mut s1); // pass mutable reference

fn change(s: &mut String) { // s is a mutable reference
    s.push_str(", world");
}
```

Rust uses `mut` keyword to represent a mutable variable or object. The passed reference `&mut s1` has to be explicit about being mutable as well as the called function must have `&mut String` for string type.

### Caveat!?

The mutable reference can have **only one instance**. Attempting to have multiple mutable references to the same data at the same time will result in a compiler error.

```rust
  // error[E0499]: cannot borrow `s` as mutable more than once at a time

  let mut s = String::from("hello");

  let r1 = &mut s;
  let r2 = &mut s;

  println!("{}, {}", r1, r2); // <- r1 is used here
```

This is because `s` can only be mutated at one place at a given time. Once `r2` has the mutable reference, any invocation of `r1` will throw the error.

```rust
  // works fine

  let mut s = String::from("hello");

  let r1 = &mut s;
  let r2 = &mut s;

  println!("{}", r2);
```

As per [The Rust Language Book](#references), it prevents an unwanted behavior called _data race_ which happens if:

1. Two or more pointers access the same data at the same time.
1. At least one of the pointers is being used to write to the data.
1. There’s no mechanism being used to synchronize access to the data.

For this same reason, Rust will also prevent you to borrow a mutable if it was previously borrowed as immutable.

```rust
  let mut s = String::from("hello");

  let r1 = &s; // no problem
  let r2 = &s; // no problem
  let r3 = &mut s; // (1) BIG PROBLEM

  println!("{}, {}, and {}", r1, r2, r3); // (2) because `r1` and `r2` are still in us of `s`
```

When invocating `r1` in our `println!` macro, the integrity of `s` cannot be guranteed because it is also passed as mutable to `r3`. In other words, the users of immutable reference `r1` are not supposed to deal with mutated behavior caused by `r3`. With same logic users of `r2` will not have any problem with `r1` as the passed values cannot be changed, and therefore the integrity is assured.

### Dangling References

A reference is dangling when it points to a location in memory which has already been cleared. Here is an example of what it may look like:

```rust
fn main() {
    let ref_x: &i32;
    { // scope block
        let x: i32 = 10;
        ref_x = &x;
    }
    println!("ref_x: {ref_x}"); // dangling reference
}
```

Here we have a scoped block inside the _main_ function. The variable `ref_x` is set outside this scope block and but is equated to `&x` inside the scope. But when the inner scope ends, `x` will be cleared from memory and will cause `ref_x` to become a dangling reference.

Good for us that Rust's compiler ensures that no reference is dangling during compile-time and therefore this situation is avoided. So if you come across a similar scenario, the compiler will throw errors warning you about this behavior.

```text
this function's return type contains a borrowed value, but there is
no value for it to be borrowed from
```

### That's all!

This is all you need to get started with references. Thank you for reading and bookmark for more!

### References

-   [The Rust Programming Language Book](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html) (_doc.rust-lang.org_)
-   [Dangling References - Comprehensive Rust](https://google.github.io/comprehensive-rust/basic-syntax/references-dangling.html) (google.github.io/comprehensive-rust)
