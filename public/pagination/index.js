import parser from './parser.js';
const paginationList = document.querySelector('.pagination-list');

/**
 * 以下为分页部分逻辑
 * getClassName ...
 * Pager ...
 * Jump ...
 * renderPager render 函数...
 */

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
    div.addEventListener('click', () => {
      state.current = item.target;
      let pages = parser.getPages({
        current: state.current,
        total: state.total
      });
      // render & request!!
      renderPager(pages);
      // request();
      state.onChange();
    });
  }
  div.textContent = item.content;
  return div;
};

// 输入跳转
let Jump = () => {
  let div = document.createElement('div');
  div.className = 'pager pager--jump';
  let tmpInput = document.createElement('input');
  tmpInput.classList.add('pager__input');
  tmpInput.value = state.current;
  tmpInput.addEventListener('keyup', e => {
    e.preventDefault();
    if (e.key === 'Enter') {
      const pattern = /^\d+$/g;
      let value = e.target.value.trim();
      if (pattern.test(value)) {
        if (value <= 0) {
          value = 0;
        }

        if (value > state.total) {
          value = state.total;
        }

        state.current = parseInt(value, 10);
        let pages = parser.getPages({
          current: state.current,
          total: state.total
        });

        // render & request!!
        renderPager(pages);
        // request();
        state.onChange();
      }
    }
  });
  let tmpSpan = document.createElement('span');
  tmpSpan.classList.add('pager__suffix');
  tmpSpan.textContent = '/ ' + state.total + ' 页';
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

export const state = {
  current: 1,
  total: 1,
  onChange: function() {}
};

export const Pagination = (_current, _total, _onChange) => {
  state.current = _current;
  state.total = _total;

  if (_onChange) {
    state.onChange = () => {
      _onChange(state);
    };
  }
  let pages = parser.getPages({
    current: state.current,
    total: state.total
  });
  renderPager(pages);
};

export default state;