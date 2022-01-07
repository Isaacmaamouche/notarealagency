import { formatJobList } from ".";

test('testing joblist formating for item 1', ()=>{
    const expected = 'item1';
    expect(formatJobList('item1', 0)).toEqual(expected);
})

test('testing joblist formating for item 2', ()=>{
    const expected = ', item2';
    expect(formatJobList('item2', 1)).toEqual(expected);
})