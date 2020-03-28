import { ParseArrayPipe } from "./array.pipe";

interface Foo {
  a: number,
  listOfNumber: number[],
  listOfString: string[],
  listOfDate: Date[]

}

describe('ParseArrayPipe', () => {

  it('Should leave others field as untouched', async () => {
    const parser = new ParseArrayPipe<Foo>({ listOfString: x => x })

    const result = await parser.transform({
      listOfString: `["A","B"]`,
      a: `["C", "D"]`,
    })

    expect(result.a).toEqual(`["C", "D"]`)
  })

  it('Should be able to transform to array', async () => {
    const parser = new ParseArrayPipe<Foo>({ listOfString: x => x })

    const result = await parser.transform({
      listOfString: `["A","B"]`
    })

    expect(result.listOfString).toBeInstanceOf(Array)
  })

  describe('Should be able to transform to array of arbitary conversion', () => {

    it('Convert to primitive type properly', async () => {
      const parser = new ParseArrayPipe<Foo>({
        listOfNumber: Number
      })

      const result = await parser.transform({
        listOfNumber: `["4",5]`
      })

      expect(result.listOfNumber).toEqual([4, 5])
    })

    it('Convert using custom conversion properly', async () => {
      const parser = new ParseArrayPipe<Foo>({
        listOfDate: (x) => new Date(x),
        listOfNumber: (x) => Number(x) + 1
      })

      const result = await parser.transform({
        listOfDate: `["09:00 AM, 29 Mar 2020", "09:00 AM, 30 Mar 2020"]`,
        listOfNumber: `["9", 7]`
      })

      expect(result.listOfDate).toEqual([new Date("09:00 AM, 29 Mar 2020"), new Date("09:00 AM, 30 Mar 2020")])
      expect(result.listOfNumber).toEqual([10, 8])
    })
  })

})