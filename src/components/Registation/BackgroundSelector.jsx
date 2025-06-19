import React from 'react';
import styles from './BackgroundSelector.module.css';
import bgImg1 from '../../assets/background/bg1.jpg';
import bgImg2 from '../../assets/background/bg2.jpg';
import bgImg3 from '../../assets/background/bg3.jpg';
import bgImg4 from '../../assets/background/bg4.jpg';
import pawIcon from '../../assets/sticker/gray_bg_selected.svg';

const backgrounds = [
  { id: 1, color: '#d7e8da' },
  { id: 2, color: '#f7e9b7' },
  { id: 3, color: '#ddeef6' },
  { id: 4, color: '#f9e3ea' },
  { id: 5, image: bgImg1 },
  { id: 6, image: bgImg2 },
  { id: 7, image: bgImg3 },
  { id: 8, image: bgImg4 },
];

function BackgroundSelector({ selectedBgId, onSelect }) {
  return (
    <div className={styles.choice__background}>
      <label className={styles.label}>배경을 선택해주세요</label>
      <div className={styles.background__items}>
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            type="button"
            className={`${styles.background__item} ${selectedBgId === bg.id ? styles.selected : ''}`}
            style={bg.color ? { background: bg.color } : bg.image ? { backgroundImage: `url(${bg.image})` } : {}}
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
