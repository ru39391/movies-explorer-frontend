import React from 'react';

function HeaderBtn({headerBtnClassMod, headerBtnIcon, headerBtnTitle, onHandleNavActive}) {
  return (
    <button className={`header__btn ${headerBtnClassMod}`} onClick={onHandleNavActive} type="button"><img src={headerBtnIcon} alt={headerBtnTitle} /></button>
  );
}

export default HeaderBtn;
