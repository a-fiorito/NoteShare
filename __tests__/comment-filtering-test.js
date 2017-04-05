import ProfanityReplacer from '../src/js/utils/filter';

describe('ProfanityReplacer', () => {
    it('Correctly filters text input', () => {
        const Input1 = "I fucking hate this bullshit"
        const Input2 = "I love this shit"
        const Input3 = "you fuckers can suck my dick"

        expect(ProfanityReplacer(Input1)).toEqual("I ***** hate this *****");
        expect(ProfanityReplacer(Input2)).toEqual("I love this *****");
        expect(ProfanityReplacer(Input3)).toEqual("you ***** can ***** my *****");


            });
        });
