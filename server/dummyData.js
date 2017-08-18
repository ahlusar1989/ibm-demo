import Company from './models/company';

export default function () {
  Company.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const company1 = new Company({ firstName: 'bob', lastName: 'williams', company: 'merc', cuid: 'cikqgkv4q01ck7453ualdn3hd', address: '4435 foo' });
    const company2 = new Company({ firstName: 'bill', lastName: 'smith', company: 'ibm', cuid: 'cikqgkv4q01ck7453ualdn3hf', address: '132434 baz' });

    Company.create([company1, company2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
