export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receives a string and normalize it as a slug.
   * 
   * Example: "An example title" => "an-example-title"
   * 
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // pega todos os espaços em branco e substitui por -
      .replace(/[^\w-]+/g, '') // pega tudo o que não for palavra e substitui por uma string vazia
      .replace(/_/g, '-') // remove os _ e substitui por -
      .replace(/--+/g, '-') // caso haja -- irá substituir por -
      .replace(/-$/g, '') // se no final da string houver um -, será substituído por uma string vazia

      return new Slug(slugText)
  }
}

/* -> para criar novas questions:

new Question({
  slug: Slug.createFromText('An example title')
  ...
  ...
  ...
}) 

**This processed string is then returned as an instance of the Slug class with value set to "an-example-title"

-> para uma question já existente: 

new Question({
  slug: Slug.create('an-example-title')
  ...
  ...
  ...
}) 

*/



/*value-objects: são propriedades de entidades que possuem regras de negócio atreladas à elas (por ex., alguma propriedade que
precise de certas formatações, validações...*/