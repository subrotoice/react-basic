[ReactJs Gist]('https://gist.github.com/subrotoice/98eb2fcbcef23c733cd36e0575c2e37c')

## TypeScript Interface

**TypeScript Interface: Say types of porps element**

```javascript
// TypeScript Interface: Say types of porps element
interface Props {
  children: string;
  color: string;
  onClick: () => void;
}
// Destructing Props
const Button = ({ children, onClick, color }: Props) => {
  return (
    <button type="button" className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

// App.js
const selectItem = (item) => {
  console.log(item);
};
return (
  <div>
    <Button color="primary" onClick={onClick}>
      My Button
    </Button>
  </div>
);
```

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```

```php
$s = "Python syntax highlighting";
echo "Value: " . $s;
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

### License

[EDEVES.COM](https://edeves.com)

Bullet lists nested within numbered list:

1. fruits
   - apple
   - banana
2. vegetables
   - carrot
   - broccoli
   - [edeves](https://edeves.com)

> blockquoting: Markdown uses email-style
> characters for blockquoting.
>
> Multiple paragraphs need to be prepended individually.

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

<details>
<summary>Collapsed section with Table</summary>

| Rank | Languages  |
| ---: | ---------- |
|    1 | Javascript |
|    2 | Python     |
|    3 | SQL        |

_You can use it for table also_

</details>

[edeves](https://edeves.com)
