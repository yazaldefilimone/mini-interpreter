# start

```bash
git clone https://github.com/yazaldefilimonepinto/crafting-an-interpreter.git

cd crafting-an-interpreter

npm i

```
```bash
❯ npm run dev:file ./exemples/while.eva

````

# variable

```cljs
(var name "Yazalde Filimone")
(print name)
(set name "Yazalde")
(print name)

```

# scope

```cljs
(var name "Yazalde")

(begin
 (print name)
 (var last_name  "Filimone")
 (print last_name))

(print name)
(print last_name)

```

# lambda/arrow function(js)

```cljs
(def onClick (callback)
  (begin
   (var x 10)
   (var y 20)
   (callback (+ x y))))

(onClick (lambda (data) (* data 10)))

```

# for loop

```cljs
(for (var x 0) (< x 10)
     (begin
      (print x)
      (set x (+ x 1))
      x))
```

# while loop

```cljs
(var x 0)
(while (< x 10)
     (begin
      (print x)
      (set x (+ x 1))
      x))
```

# switch case

```cljs
(var n 10)
(switch
 ((< n 5) "< 5")
 ((> n 5) "> 5")
 (else "no"))
```

# class

```cljs
      (class Math null
        (begin
          (def constructor (this x y)
            (begin
              (set (prop this x) x)
              (set (prop this y) y)
            )
          )

          (def calc (this)
            (+ (prop this x) (prop this y))
          )
        ))

      (var math (new Math 10 20))

      ((prop math calc) math)
```
