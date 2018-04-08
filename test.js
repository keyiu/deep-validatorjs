const validator = require('./validator.js');
const chai = require('chai');
chai.should();

describe('validator', () => {
  it('必填整数1', () => {
    const res = validator(1, {
      type: 'Int',
      required: true,
    });
    res.should.equal(true);
  });
  it('必填整数null', () => {
    const res = validator(null, {
      type: 'Int',
      required: true,
    });
    res.should.not.equal(true);
  });
  it('非必填整数1', () => {
    const res = validator(1, {
      type: 'Int',
      required: false,
    });
    res.should.equal(true);
  });
  it('非必填整数null', () => {
    const res = validator(null, {
      type: 'Int',
      required: false,
    });
    res.should.equal(true);
  });
  it('必填浮点数1.1', () => {
    const res = validator(1.1, {
      type: 'Float',
      required: true,
    });
    res.should.equal(true);
  });
  it('必填浮点数null', () => {
    const res = validator(null, {
      type: 'Float',
      required: true,
    });
    res.should.not.equal(true);
  });
  it('非必填浮点数1.1', () => {
    const res = validator(1.1, {
      type: 'Float',
      required: false,
    });
    res.should.equal(true);
  });
  it('非必填浮点数null', () => {
    const res = validator(null, {
      type: 'Float',
      required: false,
    });
    res.should.equal(true);
  });
  it('必填对象校验', () => {
    const res = validator({}, {
      type: 'Object',
      required: true,
    });
    res.should.equal(true);
  });
  it('非必填对象', () => {
    const res = validator({}, {
      type: 'Object',
      required: false,
    });
    res.should.equal(true);
  });
  it('必填对象null', () => {
    const res = validator(null, {
      type: 'Object',
      required: false,
    });
    res.should.equal(true);
  });
  it('包含内容的对象校验预期结果为错误', () => {
    const res = validator({
      a: 1,
      b: 'aa',
      c: null,
    }, {
      type: 'Object',
      required: true,
      options: {
        properties: {
          a: {
            required: true,
            type: 'Int',
          },
          b: {
            required: true,
            type: 'Int',
          },
        },
      },
    });
    res.should.not.equal(true);
  });
  it('包含内容的对象校验预期结果为正确', () => {
    const res = validator({
      a: 1,
      b: 'aa',
      c: null,
    }, {
      type: 'Object',
      required: true,
      options: {
        properties: {
          a: {
            required: true,
            type: 'Int',
          },
          b: {
            required: true,
            type: 'String',
          },
          c: {
            required: false,
            type: 'Int',
          },
        },
      },
    });
    res.should.equal(true);
  });
  it('不包含内容的数组测试', () => {
    const res = validator([{
      a: 1,
      b: 'aa',
      c: 'b',
    }], {
      type: 'Array',
      required: true,
      options: {
        properties: {
          a: {
            required: true,
            type: 'Int',
          },
          b: {
            required: true,
            type: 'String',
          },
          c: {
            required: true,
            type: 'Int',
          },
        },
      },
    });
    res.should.not.equal(true);
  });
  it('对象数组校验', () => {
    const res = validator([{
      a: {
        b: 'a',
      },
    }], {
      type: 'Array',
      required: true,
      options: {
        properties: {
          a: {
            required: true,
            type: 'Object',
            options: {
              properties: {
                b: {
                  type: 'Int',
                  required: true,
                },
              },
            },
          },
        },
      },
    });
    res.should.not.equal(true);
  });
});