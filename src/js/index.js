// @flow
export class Hello {
  name: string; // this.nameの型定義

  constructor(name: string) { // 引数nameの型定義
    this.name = name;
    this.say();
  }

  say(): void { // 戻り値の型定義、voidである場合は省略も可能
    console.log(`Hello ${this.name} World!`);
  }
}

export default new Hello('Nekomimi');
