-module(pow).
-export([pow/2]).

pow(Sum, 0, _) ->
    Sum;
pow(Sum, Num, Orig) ->
  pow(Sum * Orig, Num - 1, Orig).
pow(A, B) ->
  pow(1, B, A).