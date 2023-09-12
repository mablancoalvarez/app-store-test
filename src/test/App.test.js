import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from '../context/DataContext';
import ProductsList from '../screens/ProductsList';

describe('ProductsList component rendered correctly', () => {
  it('SHOULD ProductsList component for "/" route', () => {
    render(
      <BrowserRouter>
        <DataProvider>
          <Routes>
            <Route path="/" element={<ProductsList />} />
          </Routes>
        </DataProvider>
      </BrowserRouter>
    );
    const productsListElement = screen.getByTestId('products-list');
    expect(productsListElement).toBeInTheDocument();
  });

  it('SHOULD render the expected ProductsList Component', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProductsList />
      </BrowserRouter>
    );
    const heading = getByText(/Vuelta al cole/i);
    expect(heading).toBeInTheDocument();
  });
});
