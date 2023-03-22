import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import '../Public/style'
import './css/product.css'

import Loading from '../Public/Loading'

function Product() {
  // loading畫面
  const [loadingOne, setLoadingOne] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [allProductData, setAllProductData] = useState([])
  const [allProductCatagory, setallProductCatagory] = useState([])
  const [filterProductCatagory, setfilterProductCatagory] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('選擇商品種類')
  const [showCatogory, setshowCatogory] = useState(false)

  const [filterProductPrice, setfilterProductPrice] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('選擇價格排序')
  const [showPrice, setshowPrice] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  const [Memberlike, setMemberlike] = useState([])
  // 登入判斷設定愛心
  const { myAuth } = useContext(AuthContext)
  let likedProducts = {}
  if (myAuth.authorized) {
    const Array = Memberlike.map((v, i) => {
      return v.productmanage
    }).map((v, i) => {
      return { [v]: true }
    })
    let obj = {}
    Array.map((v, i) => {
      obj = { ...obj, ...v }
    })
    likedProducts = obj
    // console.log('MemberlikedProducts', likedProducts)
    //{BD0002FR: true, BD0003FR: true, BD0004FR: true}
  } else {
    if (localStorage.getItem('likedProducts') !== null) {
      likedProducts = JSON.parse(localStorage.getItem('likedProducts'))
      // console.log('localStoragelikedProducts', likedProducts)
      //{BD0002FR: true, BD0003FR: true, BD0004FR: true}
    }
  }

  const categoryselect = () => {
    setshowCatogory(!showCatogory)
    setshowPrice(false)
  }
  const priceselect = () => {
    setshowPrice(!showPrice)
    setshowCatogory(false)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingOne(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `http://localhost:3008/product/api/getproductlike/${myAuth.sid} `
      )
      const data = await res.json()
      // console.log(data.rows)
      setMemberlike(data.rows)
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3008/product/api/allproduct')
      const data = await res.json()
      setAllProductData(data.rows)
    }
    fetchData()
    setfilterProductPrice('')
    setIsLoading(true)
  }, [])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'http://localhost:3008/product/api/productcatagory'
      )
      const data = await res.json()
      setallProductCatagory(data.rows)
    }
    fetchData()
  }, [])

  const ScrollToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const clickCatagory = (id, catagory_ch) => {
    setfilterProductCatagory(id)
    setSelectedCategory(catagory_ch)
    setshowCatogory(false)
    setCurrentPage(1)
    ScrollToTopButton()
  }

  const clickPrice = (id, Price_ch) => {
    setfilterProductPrice(id)
    setSelectedPrice(Price_ch)
    setshowPrice(false)
    setCurrentPage(1)
    ScrollToTopButton()
  }

  // 分頁

  const pageNumbers = []
  for (
    let i = 1;
    i <=
    Math.ceil(
      allProductData.filter((product) =>
        product.product_id.includes(filterProductCatagory)
      ).length / productsPerPage
    );
    i++
  ) {
    pageNumbers.push(i)
  }

  return (
    <>
      {loadingOne ? '' : <Loading />}

      {isLoading ? '' : <Loading />}
      {/* <!-- Sec-navbar 要用nav-space 空出上面的距離 --> */}
      <div className="container-fluid d-none d-md-block nav-space pb-5 product-nav">
        <div className="container">
          <div className="row sec-navbar">
            <div className="col-auto">
              <Link to="/" className="me-1">
                主頁
              </Link>
              /{' '}
              <Link to="/product" className="me-1">
                商品
              </Link>
              {selectedCategory === '選擇商品種類' ? (
                ' '
              ) : (
                <>
                  /{' '}
                  <Link to="/product" className="me-1">
                    {selectedCategory}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid nav-space pt-md-0">
        <div className="container d-flex flex-column flex-md-row">
          {/* <!-- section-left --> */}
          <div
            className={`selectbox-left ${
              allProductData.length ? '' : 'd-none'
            }`}
          >
            {/* <!-- 有側邊欄的大區塊 --> */}
            {/*  搜尋商品 */}

            {/*  選擇商品種類 */}
            <div className="select-row">
              <div className="select-col">
                <div className="selectbox select-title">
                  <button
                    className="g-line-btn h3 d-inline-block d-md-none"
                    onClick={categoryselect}
                  >
                    {selectedCategory ? selectedCategory : '選擇商品種類'}
                  </button>
                </div>

                <div
                  className={`selectbox select-item ${
                    showCatogory ? '' : 'd-none'
                  } d-md-block`}
                >
                  {allProductCatagory.map((catogory) => (
                    <div key={catogory.catagory_id}>
                      <button
                        className={`g-line-btn h3 d-inline-block ${
                          selectedCategory === catogory.catagory_ch
                            ? 'j-deep'
                            : ''
                        }`}
                        onClick={(event) =>
                          clickCatagory(
                            catogory.catagory_id,
                            catogory.catagory_ch,
                            event
                          )
                        }
                      >
                        {catogory.catagory_ch}
                      </button>
                    </div>
                  ))}
                  <button
                    key="Allcatogory"
                    className={`g-line-btn h3 d-inline-block ${
                      selectedCategory === '全部種類' ? 'j-deep' : ''
                    }`}
                    onClick={() => clickCatagory('', '全部種類')}
                  >
                    全部種類
                  </button>
                </div>
              </div>
              {/*  選擇價格排序 */}
              <div className="select-col">
                <div className="selectbox select-title">
                  <button
                    className="price-btn h3 d-inline-block d-md-none"
                    onClick={priceselect}
                  >
                    {selectedPrice ? selectedPrice : '選擇價格排序'}
                  </button>
                </div>

                <div
                  className={`selectbox select-item ${
                    showPrice ? '' : 'd-none'
                  } d-md-block`}
                >
                  <button
                    key="PriceHtoL"
                    className={`price-btn h3 d-inline-block ${
                      selectedPrice === '價格由高至低' ? 'j-deep' : ''
                    }`}
                    onClick={() => clickPrice('DESC', '價格由高至低')}
                  >
                    價格由高至低
                  </button>
                  <button
                    key="PriceLtoH"
                    className={`price-btn h3 d-inline-block ${
                      selectedPrice === '價格由低至高' ? 'j-deep' : ''
                    }`}
                    onClick={() => clickPrice('ASC', '價格由低至高')}
                  >
                    價格由低至高
                  </button>
                  <button
                    key="Priceselectnone"
                    className={`price-btn h3 d-inline-block ${
                      selectedPrice === '不排序價格' ? 'j-deep' : ''
                    }`}
                    onClick={(event) => clickPrice('', '不排序價格', event)}
                  >
                    不排序價格
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <Select /> */}

          {/* <!-- section-right --> */}
          <div className="sec-right ps-7 mb-5 pt-4 pt-md-0">
            <div className="row row-cols-2  row-cols-xl-3 g-4 g-lg-5 g-xl-5">
              {allProductData
                .filter((product) =>
                  product.product_id.includes(filterProductCatagory)
                )
                .sort((a, b) => {
                  if (filterProductPrice === 'ASC') {
                    return a.productprice - b.productprice
                  }
                  if (filterProductPrice === 'DESC') {
                    return b.productprice - a.productprice
                  }
                  return 0
                })
                .slice(
                  (currentPage - 1) * productsPerPage,
                  currentPage * productsPerPage
                )

                .map((product) => (
                  <ProductCard
                    key={product.product_id}
                    productId={product.product_id}
                    productch={product.product_ch}
                    productprice={product.productprice}
                    isLiked={likedProducts[product.product_id]}
                    productimg={product.product_img}
                    catagory={product.product_catagory_id}
                  />
                ))}
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col-auto">
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    className={`g-line-btn me-2 j-h3 ${
                      currentPage === number ? 'pagebutton' : ''
                    }`}
                    onClick={() => {
                      setCurrentPage(number)
                      ScrollToTopButton()
                    }}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
