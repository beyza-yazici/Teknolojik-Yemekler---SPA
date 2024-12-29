import React, { useState } from 'react';
import { pizzaData } from '../sahteVeri';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import "../css/OrderPizza.css"
import "../../images/iteration-1-images/logo.svg"
import axios from 'axios';

function OrderPizza({goBack, onSuccess}) {
  const [order, setOrder] = useState({ selectedExtras: [] });
  const [selectedDough, setSelectedDough] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [count, setCount] = useState(1);
  const [ad, setAd] = useState('');
  const [error, setError] = useState('');

  const { name, price, description, rating, reviewCount } = pizzaData[0];

  const extras = [
    "Sosis", "Pepperoni", "Mozzarella Peyniri", "Biber", "Soğan", "Mısır", 
    "Zeytin", "Sucuk", "Roka", "Mantar", "Domates", "Tavuk Izgara", "Ananas", "Fesleğen"
  ];

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleDoughChange = (event) => {
    setSelectedDough(event.target.value);
  };

  const handleNameChange = (event) => {
    setAd(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ad.length < 3) {
      setError("İsim en az 3 karakter olmalıdır.");
      return;
    }
    setError("");

    const orderData = {
      name: ad,
      size: selectedSize,
      dough: selectedDough,
      extras: order.selectedExtras,
      count: count,
      price: price + getExtrasPrice() + getSizePrice(),
    };

    axios.post('https://reqres.in/api/pizza', orderData)
      .then(response => {
        console.log('Gelen Yanıt:', response.data);
        
        setOrder({ selectedExtras: [] });
        setSelectedSize('');
        setSelectedDough('');
        setCount(1);
        setAd('');
        onSuccess();
      })
      .catch(error => {
        console.error('API isteği sırasında bir hata oluştu:', error);
      });
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setOrder((prevOrder) => {
      const selectedExtras = prevOrder.selectedExtras;
      let updatedExtras;

      if (selectedExtras.includes(value)) {
        updatedExtras = selectedExtras.filter((extra) => extra !== value);
      } else {
        if (selectedExtras.length < 10) {
          updatedExtras = [...selectedExtras, value];
        } else {
          updatedExtras = selectedExtras;
        }
      }

      return { ...prevOrder, selectedExtras: updatedExtras };
    });
  };

  const increment = () => setCount(count + 1);
  const decrement = () => { if (count > 0) setCount(count - 1); };

  const getSizePrice = () => {
    if (selectedSize === 'small') return 30;
    if (selectedSize === 'medium') return 50;
    if (selectedSize === 'large') return 70;
    return 0;
  };

  const getExtrasPrice = () => order.selectedExtras.length * 5;

  const total = (price + getSizePrice() + getExtrasPrice()) * count;

  const isFormValid = () => {
    return (
      selectedSize !== '' &&
      selectedDough !== '' &&
      count > 0 &&
      order.selectedExtras.length > 0 && 
      order.selectedExtras.length <= 10
    );
  };

  return (
  <div>
  <header>
    <img src="../../images/iteration-1-images/logo.svg" alt="Logo" />
    <div className="order-header">
      <button onClick={goBack}>Anasayfa</button>
      <button>Seçenekler</button>
      <button>Sipariş Oluştur</button>
    </div>
  </header>

  <section>
    <div className="pizza-info">
      <h3>{name}</h3>
      <div className="pizza-details">
        <p>{price}₺</p>
        <div className="rating">
          <p>{rating}</p>
          <p>({reviewCount})</p>
        </div>
      </div>
      <p>{description}</p>
    </div>

    <Form onSubmit={handleSubmit}>
      <FormGroup className="pizza-sizes">
        <div className="selection-container">
          <Label className="size-header">
            <h3 className="required">Boyut Seç</h3>
          </Label>
          <div className="pizza-size-selection">
            <input type="radio" id="small" name="size" value="small" onChange={handleSizeChange} />
            <label htmlFor="small">Küçük</label>
          </div>
          <div className="pizza-size-selection">
            <input type="radio" id="medium" name="size" value="medium" onChange={handleSizeChange} />
            <label htmlFor="medium">Orta</label>
          </div>
          <div className="pizza-size-selection">
            <input type="radio" id="large" name="size" value="large" onChange={handleSizeChange} />
            <label htmlFor="large">Büyük</label>
          </div>
        </div>
      </FormGroup>

      <div className="dough-selection">
        <h3 className="required">Hamur Seç</h3>
        <select value={selectedDough} onChange={handleDoughChange}>
          <option value="">Hamur Kalınlığı</option>
          <option value="İnce">İnce</option>
          <option value="Normal">Normal</option>
          <option value="Kalın">Kalın</option>
        </select>
      </div>

      <FormGroup className="extras">
        <h3>Ek Mazemeler</h3>
        <p>Ekstra malzeme: 5₺</p>

        <div className="extras-selection">
          {extras.map((extra) => (
            <div className='extra' key={extra}>
              <input
                type="checkbox"
                id={extra}
                value={extra}
                onChange={handleCheckboxChange}
                checked={order.selectedExtras.includes(extra)}
              />
              <label htmlFor={extra}>{extra}</label>
            </div>
          ))}
        </div>
        {order.selectedExtras.length >= 10 && (
          <p style={{ color: 'red' }}>En fazla 10 malzeme seçebilirsiniz.</p>
        )}
      </FormGroup>

      <FormGroup className="ad">
        <label htmlFor="ad">
        <h3>İsim : </h3></label>
        <input
          data-cy="ad"
          type="text"
          id="ad"
          name="ad"
          value={ad}
          onChange={handleNameChange}
          minLength={3}
          required
          placeholder="Lütfen isminizi giriniz."
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <h3>Sipariş Notu</h3>
        <label htmlFor="note">
          <textarea id="note" name="note" rows="4" cols="50" placeholder="Siparişine eklemek istediğin bir not var mı?" />
        </label>
        </FormGroup>

      <hr />
      <div className="count-order">
        <FormGroup>
          <div className="counter">
            <Button onClick={decrement} className="decrement">-</Button>
            <span className="count">{count}</span>
            <Button onClick={increment} className="increment">+</Button>
          </div>
        </FormGroup>

        <FormGroup className="order-details">
          <h3>Sipariş Toplamı</h3>
          <div className="extra-price">
            <p>Seçimler:</p> <p>{getExtrasPrice()} ₺</p>
          </div>
          <div className="total-price">
            <p>Toplam:</p><p> {total} ₺</p>
          </div>
        <Button type="submit" disabled={!isFormValid()}>SİPARİŞ VER</Button>
        </FormGroup>
        </div>
    </Form>
  </section>
</div>
  );
}

export default OrderPizza;
