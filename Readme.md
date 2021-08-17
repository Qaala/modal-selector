# Modal Selector

```javascript
let settings = $.extend({
    url: null,
    data: null,
    nameProperty: "name",
    idProperty: "id",
    childrenProperty: "children",
    _: {
        id: Math.floor(Math.random()*10000),
        modalParent: "body"
    },
    localization: {
        search: "Ara"
    },
    onSelect: null
}, options);
```

#### Insert Data

`url` vererek ya da direkt olarak `data` property'si gönderilerek veriler içeri aktarılabilir. Data içerisindeki hangi property'nin kullanıcıya gösterilecek olduğu text alanına karşılık geldiği `nameProperty` ile sağlanır. Id için `idProperty`, eğer çocukları varsa kullanılacak olanlar için `childrenProperty` belirtilmelidir.

#### onSelect

Kullanıcı son daldan bir element seçtiğinde tetiklenecek event.

Parametreleri

- `event`
- `data`
  - `text`
  - `id`
  - `children`
- `modal`

## Dependencies
- jQuery
- FontAwesome
- Bootstrap
