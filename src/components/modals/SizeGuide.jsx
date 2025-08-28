import { useState } from "react";

export default function SizeGuide() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [activeTab, setActiveTab] = useState(1);
  const [bodyType, setBodyType] = useState(1); // 0=subțire, 1=normal, 2=plinuț

  // Calculează BMI
  const calculateBMI = () => {
    const heightInM = height / 100;
    return weight / (heightInM * heightInM);
  };

  // Calculează mărimea recomandată bazată pe date românești
  const getRecommendedSize = () => {
    const bmi = calculateBMI();
    let baseSize = 'M';

    // Logica pentru înălțime (adaptată pentru România)
    if (height < 155) {
      baseSize = 'XS';
    } else if (height < 162) {
      baseSize = 'S';
    } else if (height < 170) {
      baseSize = 'M';
    } else if (height < 178) {
      baseSize = 'L';
    } else {
      baseSize = 'XL';
    }

    // Ajustare în funcție de BMI
    if (bmi < 18.5) {
      // Subponderal - mărime mai mică
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const currentIndex = sizes.indexOf(baseSize);
      if (currentIndex > 0) baseSize = sizes[currentIndex - 1];
    } else if (bmi > 25) {
      // Supraponderal - mărime mai mare
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const currentIndex = sizes.indexOf(baseSize);
      if (currentIndex < sizes.length - 1) baseSize = sizes[currentIndex + 1];
    }

    // Ajustare finală pentru tipul corpului
    if (bodyType === 0) {
      // Tipul subțire - o mărime mai mică
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const currentIndex = sizes.indexOf(baseSize);
      if (currentIndex > 0) baseSize = sizes[currentIndex - 1];
    } else if (bodyType === 2) {
      // Tipul plinuț - o mărime mai mare
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const currentIndex = sizes.indexOf(baseSize);
      if (currentIndex < sizes.length - 1) baseSize = sizes[currentIndex + 1];
    }

    return baseSize;
  };

  const bodyTypes = [
    { label: "Subțire", description: "Corp zvelt, umeri îngust" },
    { label: "Normal", description: "Proporții echilibrate" },
    { label: "Plinuț", description: "Corp mai robust" }
  ];

  return (
      <div className="modal fade modal-size-guide" id="size-guide">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content widget-tabs style-2">
            <div className="header">
              <ul className="widget-menu-tab">
                <li
                    className={`item-title ${activeTab == 1 ? "active" : ""} `}
                    onClick={() => setActiveTab(1)}
                >
                  <span className="inner text-button">Mărime</span>
                </li>
                <li
                    className={`item-title ${activeTab == 2 ? "active" : ""} `}
                    onClick={() => setActiveTab(2)}
                >
                  <span className="inner text-button">Ghid de mărimi</span>
                </li>
              </ul>
              <span
                  className="icon-close icon-close-popup"
                  data-bs-dismiss="modal"
              />
            </div>
            <div className="wrap">
              <div className="widget-content-tab">
                <div
                    className={`widget-content-inner ${
                        activeTab == 1 ? "active" : ""
                    } `}
                >
                  <div className="tab-size">
                    <div className="text-center mb-3">
                      <h5 className="mb-1">🇷🇴 Calculator mărime România</h5>
                      <p className="text-muted small mb-0">Introduceți datele pentru a afla mărimea potrivită</p>
                    </div>

                    {/* Height Slider */}
                    <div className="widget-size mb-3">
                      <div className="box-title-size">
                        <div className="title-size">Înălțime</div>
                        <div className="number-size">
                          <span className="max-size">{height}</span>
                          <span className="text-caption-1 text-secondary">cm</span>
                        </div>
                      </div>
                      <div className="range-input">
                        <div className="tow-bar-block">
                          <div
                              className="progress-size"
                              style={{ width: `${((height - 140) / (200 - 140)) * 100}%` }}
                          />
                        </div>
                        <input
                            type="range"
                            min="140"
                            max="200"
                            value={height}
                            onInput={(e) => setHeight(parseInt(e.target.value))}
                            className="range-max"
                        />
                      </div>
                    </div>

                    {/* Weight Slider */}
                    <div className="widget-size mb-3">
                      <div className="box-title-size">
                        <div className="title-size">Greutate</div>
                        <div className="number-size">
                          <span className="max-size">{weight}</span>
                          <span className="text-caption-1 text-secondary">kg</span>
                        </div>
                      </div>
                      <div className="range-input">
                        <div className="tow-bar-block">
                          <div
                              className="progress-size"
                              style={{ width: `${((weight - 40) / (120 - 40)) * 100}%` }}
                          />
                        </div>
                        <input
                            type="range"
                            min="40"
                            max="120"
                            value={weight}
                            onInput={(e) => setWeight(parseInt(e.target.value))}
                            className="range-max"
                        />
                      </div>
                    </div>

                    {/* BMI Info */}
                    <div className="text-center mb-3 p-2" style={{backgroundColor: '#f8f9fa', borderRadius: '6px'}}>
                      <small className="text-muted">
                        <strong>BMI:</strong> {calculateBMI().toFixed(1)}
                        {calculateBMI() < 18.5 && " (Subponderal)"}
                        {calculateBMI() >= 18.5 && calculateBMI() <= 24.9 && " (Normal)"}
                        {calculateBMI() >= 25 && calculateBMI() <= 29.9 && " (Supraponderal)"}
                        {calculateBMI() >= 30 && " (Obez)"}
                      </small>
                    </div>

                    {/* Body Type Selection */}
                    <div className="mb-3">
                      <h6 className="mb-2">Tipul corpului</h6>
                      <div className="size-button-wrap choose-option-list">
                        {bodyTypes.map((type, index) => (
                            <div
                                key={index}
                                className={`size-button-item choose-option-item ${
                                    index === bodyType ? "select-option" : ""
                                }`}
                                onClick={() => setBodyType(index)}
                                style={{padding: '8px 12px'}}
                            >
                              <h6 className="mb-1">{type.label}</h6>
                              <small className="text-muted">{type.description}</small>
                            </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Size - Main Result */}
                    <div className="text-center p-3" style={{backgroundColor: '#fff3cd', border: '2px solid #ffc107', borderRadius: '8px'}}>
                      <p className="text-muted mb-1">🎯 Mărimea dumneavoastră recomandată</p>
                      <h2 className="mb-1" style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#856404'}}>
                        {getRecommendedSize()}
                      </h2>
                      <small className="text-muted d-block mb-2">
                        Bazat pe: înălțime {height}cm, greutate {weight}kg, tip corp {bodyTypes[bodyType].label.toLowerCase()}
                      </small>
                      <button className="btn btn-warning btn-sm">
                        ✓ Selectează mărimea {getRecommendedSize()}
                      </button>
                    </div>

                    {/* Tips */}
                    <div className="mt-2">
                      <small className="text-muted">
                        <strong>💡 Sfaturi:</strong> Măsurați-vă dimineața pentru rezultate precise.
                        În caz de îndoială, alegeți mărimea mai mare.
                      </small>
                    </div>
                  </div>
                </div>

                <div
                    className={`widget-content-inner ${
                        activeTab == 2 ? "active" : ""
                    } `}
                >
                  <table className="tab-sizeguide-table">
                    <thead>
                    <tr>
                      <th>Mărime</th>
                      <th>US</th>
                      <th>Bust</th>
                      <th>Talie</th>
                      <th>Șold inferior</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>XS</td>
                      <td>2</td>
                      <td>32</td>
                      <td>24 - 25</td>
                      <td>33 - 34</td>
                    </tr>
                    <tr>
                      <td>S</td>
                      <td>4</td>
                      <td>26 - 27</td>
                      <td>34 - 35</td>
                      <td>35 - 36</td>
                    </tr>
                    <tr>
                      <td>M</td>
                      <td>6</td>
                      <td>28 - 29</td>
                      <td>36 - 37</td>
                      <td>38 - 40</td>
                    </tr>
                    <tr>
                      <td>L</td>
                      <td>8</td>
                      <td>30 - 31</td>
                      <td>38 - 39</td>
                      <td>42 - 44</td>
                    </tr>
                    <tr>
                      <td>XL</td>
                      <td>10</td>
                      <td>32 - 33</td>
                      <td>40 - 41</td>
                      <td>45 - 47</td>
                    </tr>
                    <tr>
                      <td>XXL</td>
                      <td>12</td>
                      <td>34 - 35</td>
                      <td>42 - 43</td>
                      <td>48 - 50</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}