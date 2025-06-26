import React from 'react';
import styles from './BackgroundSelector.module.css';
import pawIcon from '../../assets/sticker/gray_bg_selected.svg';
import bgThemes from '../../data/bgThemes';

function BackgroundSelector({ selectedBgId, onSelect }) {
  return (
    <div className={styles.choice__background}>
      <label className={styles.label}>배경을 선택해주세요</label>
      <div className={styles.background__items}>
        {bgThemes.map((bg) => (
          <button
            key={bg.id}
            type="button"
            className={`${styles.background__item} ${selectedBgId === bg.id ? styles.selected : ''}`}
            style={
              bg.type === 'color'
                ? { background: bg.value }
                : bg.type === 'image'
                ? { backgroundImage: `url(${bg.value})` }
                : {}
            }
            onClick={() => onSelect(bg.id)}
          >
            {selectedBgId === bg.id && <img src={pawIcon} alt="선택됨" className={styles.paw__icon} />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BackgroundSelector;
