const cpu = {
  init: null,
  set: null,
  register: [],
  address: null,
  save: null,
  multiply: null,
  toggle: null,
  process: logic
};

function logic(input) {
  if (this.init) {
    if (this.multiply) {
      if (this.toggle) {
        this.register[this.address] *= this.register[input];
        this.toggle--;
        if (!this.toggle) return (this.multiply = null);
      }
    }
    if (this.set) {
      this.address = input;
      return (this.set = null);
    }
    if (this.save) {
      this.register[this.address] = input;
      return (this.save = !this.save);
    }
    if (input === 2) return (this.set = true);
    if (input === 4) return (this.save = !this.save);
    if (input === 5) {
      this.toggle = 2;
      this.register[this.address] = 1;
      return (this.multiply = true);
    }
    if (input === 6) return console.log(this.register[this.address]);
    if (input === 7) return console.log(this.register.map(v => String.fromCharCode(v)).join(''));
  }
  if (input === 1) this.init = true;
}

const { stdin } = process;

stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', text => {
  text.split('\n').map(line => {
    const input = parseInt(line.replace(/\s*#.*/, ''), 2);
    if (!isNaN(input)) cpu.process(input);
  });
});