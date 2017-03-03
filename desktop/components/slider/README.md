# Slider

![](http://files.artsy.net/images/slider.png)

## Example

Add the `createSlider` function

````coffeescript
@slider = createSlider
  $container: @$('.artsy-primer-personalize-slider')
  name: 'Price'
  min: 50
  max: 50000
  range: {
    min: [50, 100]
    '20%': [10000, 500]
    '50%': [25000, 1000]
    max: [50000]
  }
  formatter: (val, index) ->
    if index is 0
      "#{formatMoney(val, { precision: 0 })}"
    else
      "#{formatMoney(val, { symbol: "", precision: 0 })}"
````

Bind to the update

```coffescript
@slider.on 'set', ([formatted, _, range]) ->
  console.log "I like #{range[0]} to #{range[1]} prices"
```
