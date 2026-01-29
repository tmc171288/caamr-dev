---
title: TypeScript is JavaScript with syntax for types.
date: 2026-01-29
excerpt: TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
tags:
  - TypeScript
thumbnail: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAclBMVEX///8AeswAdssAcckAb8jv9ftoodnQ4PIAdMq/1+6av+UAeMsAcMkAdcpXmtcAbchNldWvzep3q93D2e/a6PX3+/0widGNueJdnNdAkNOoyOgWgc7Y5/UIfs4nhdCWveSGtOHj7/htptt9rt7x+PwAZcaHaEHeAAADLklEQVR4nO3b7XKiMBhA4UKiBgNFUNSt2lbr3v8trlIEErH6doZxdjjPr1ZCZjgDyoe+vAAAAAAAAAAAAAAAAAAAAADAf22xHvdi/ewN68MkDXthnr1hfZiooA82fPaG9YFYAsQSIJYAsQSIJUAsAWIJEEuAWALEEiCWALEEiCVALAFiCRBLgFgCxBIglgCxBIglQCwBYgkQS4BYAsQSIJYAsQSIJUAsAWIJEEuAWALEEiCWALEEumLZn7lRjDoxofWmGEos+2c2m736ZrWmi413+VsURdk03+hwkLHiO6sEVS2rXyfNq9u1tgOMpe6ssrNVj7k3VetYJFblO5bdjfwFo50llmdzTmLNVatTrcQSy1XGUlnnbJpYrvdTLPvevWxsBxbr3g+6zrHMW/1v9PERXf7+NEPbswJVSz+qYVHavHjeefS+WjDaxcYoW55DLN4vrQYUq7WTTathkTesPlTXSdlGL067VTrAU4cHYll7Wb/6/LPv841pDyBWRyxzeUdX3jXjk7anV788DOsPgXHSuSKxWnRRLTjuTNeKxGqJt5cJijzt2LmI1ZJ8NlOMcmW821nEcmKYojVJMQ3c93diubtW7s6TbZxcxHLoyJspC1pv9cTyas39uVqn8MRy2XR6NZkZ3P2sB2Odzh9me2+2fTi0WzQPxzpdPx+8XFtNrBuxTgP0eOvMtzLEuhUrCEK9dD4XFbFuxyoftbZuyB9CYv04zMbL+llPpoh15/sjzeXPIibW9bAwaV/fmFU18qiJ5Q+zenzMdPN/OL7MyGHo31aOl+fnOYfm1eSrGlmwZ7mxQlt9/B0u35yx6aIauSeWE8se6tXfjEqsNcrU51oRh6Eba9maIPpav+ZZcyuQ8yzvMFSrm/MVcUAsd5ie3JovT4jlfxqqRfd0EXcdOh5YKP+ucmk+uO9nPRKrPCm9mmxVn6UOOta843In/nLv/GWth9NDjGXX02952LE00cvVfH8sXorjIhsbNcSvdju1zLeuVuVipUux9xuLQcb6LWIRi1iPI5YAsQQmf3Uv0mdvWB+KUU+evWEAAAAAAAAAAAAAAAAAAAAAAOD/9w9zPT4sQG0RIQAAAABJRU5ErkJggg==
---

TypeScript stands in an unusual relationship to JavaScript. TypeScript offers
all of JavaScript’s features, and an additional layer on top of these:
TypeScript’s type system.

For example, JavaScript provides language primitives like string and number, but
it doesn’t check that you’ve consistently assigned these. TypeScript does.

This means that your existing working JavaScript code is also TypeScript code.
The main benefit of TypeScript is that it can highlight unexpected behavior in
your code, lowering the chance of bugs.

This tutorial provides a brief overview of TypeScript, focusing on its type
system.

Types by Inference TypeScript knows the JavaScript language and will generate
types for you in many cases. For example in creating a variable and assigning it
to a particular value, TypeScript will use the value as its type.

let helloWorld = "Hello World";

let helloWorld: string
