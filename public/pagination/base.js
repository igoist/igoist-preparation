const log = console.log.bind(console);
let total = 22;
let current = 1;
let parser;
const paginationList = document.querySelector('.pagination-list');

// async function main() {
//   let module = await import('./parser.js');
//   let parser = module.default;
//   let pages = parser.getPages({
//     current,
//     total
//   });
// }

import('./parser.js').then(module => {
  parser = module.default;
  let pages = parser.getPages({
    current,
    total
  });
  log('pages: ', pages);
  renderPager(pages);
});

// 用于计算并返回 Pager 的 className
let getClassName = item => {
  const { current, type, target } = item;
  let className = 'pager';
  if (current) {
    className += ' pager--current';
  }
  if (type === 'omni') {
    className += ' pager--omni';
  }
  if (type !== 'omni' && !target) {
    className += ' pager--disabled';
  }
  return className;
};

let Pager = item => {
  let className = getClassName(item);

  let div = document.createElement('div');
  div.className = className;
  if (item.target && !item.current) {
    div.addEventListener('click', e => {
      current = item.target;
      let pages = parser.getPages({
        current,
        total
      });
      // render!!!
      renderPager(pages);
    });
  }
  div.textContent = item.content;
  return div;
};

// 输入跳转
let Jump = item => {
  let div = document.createElement('div');
  div.className = 'pager pager--jump';
  let tmpInput = document.createElement('input');
  tmpInput.classList.add('pager__input');
  tmpInput.value = current;
  tmpInput.addEventListener('keyup', e => {
    e.preventDefault();
    if (e.key === 'Enter') {
      const pattern = /^\d+$/g;
      let value = e.target.value.trim();
      if (pattern.test(value)) {
        if (value <= 0) {
          value = 0;
        }

        if (value > total) {
          value = total;
        }

        current = parseInt(value, 10);
        let pages = parser.getPages({
          current,
          total
        });

        renderPager(pages);
      }
    }
  });
  let tmpSpan = document.createElement('span');
  tmpSpan.classList.add('pager__suffix');
  tmpSpan.textContent = '/ ' + total + ' 页';
  div.appendChild(tmpInput);
  div.appendChild(tmpSpan);
  return div;
};

let renderPager = pages => {
  let fragment = document.createDocumentFragment();
  pages.map(item => {
    if (item) {
      if(item.type !== 'input') {
        fragment.appendChild(Pager(item));
      } else {
        fragment.appendChild(Jump(item));
      }
    }
  });
  paginationList.innerHTML = '';
  paginationList.appendChild(fragment);
};

