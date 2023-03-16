import React, { useState, useEffect } from 'react'
import LikeButton from '../Public/Likebutton'
import Counter from './Counter'

function Productinfo(props) {
  const [likedProducts, setLikedProducts] = useState(() => {
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts'))
    return likedProducts || {}
  })
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (likedProducts[props.productId]) {
      setIsLiked(true)
    }
  }, [props.productId, likedProducts])

  const handleClick = (event) => {
    event.preventDefault()
    const newLikedProducts = { ...likedProducts }
    if (isLiked) {
      delete newLikedProducts[props.productId]
      setIsLiked(false)
    } else {
      newLikedProducts[props.productId] = true
      setIsLiked(true)
    }
    setLikedProducts(newLikedProducts)
    localStorage.setItem('likedProducts', JSON.stringify(newLikedProducts))
  }

  const handleMouseEnter = (e) => {
    if (!isLiked) {
      e.target.classList.remove('fa-regular')
      e.target.classList.add('fa-solid')
    }
  }

  const handleMouseLeave = (e) => {
    if (!isLiked) {
      e.target.classList.remove('fa-solid')
      e.target.classList.add('fa-regular')
    }
  }

  return (
    <>
      <div className="container-fluid nav-space pe-0 ps-0 ps-lg-auto nav-space">
        <div className="container d-md-flex flex-column flex-md-row">
          {/* <!-- section-left --> */}
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="prodctde-l  d-md-flex">
                <div className="prodctde-box">
                  <img
                    src={`http://localhost:3008/product_img/${props.product_img}`}
                    className="productde-img"
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6 mt-3 mt-lg-0">
              <div className="prodctde-r ps-auto ps-md-0 ps-lg-5  mb-5">
                <div className="row text-center text-md-start">
                  <div className="col-12 ">
                    <div className="div">
                      <div className="row">
                        <div className="col-auto">
                          <h1 className="j-deepSec">{props.product_ch}</h1>
                        </div>
                        <div className="col-auto ps-0">
                          <div className="prodctde-like">
                            <button
                              type="button"
                              className="no-line-btn h1 icon-button like-btn productinfo-like"
                              onClick={handleClick}
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                            >
                              <LikeButton isLiked={isLiked} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h2 className="pt-2">{props.product_eg}</h2>
                    <div className="row row-cols-1 row-cols-xl-2 mt-0 mt-lg-2">
                      <div className="col mt-2">
                        <div className="row">
                          <div className="col-3">
                            <h3 className="productbox-line-r">品牌</h3>
                          </div>
                          <div className="col">
                            <h3 className="prodctde-content">
                              {props.product_winery}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col mt-2">
                        <div className="row">
                          <div className="col-3">
                            <h3 className="productbox-line-r">產地</h3>
                          </div>
                          <div className="col">
                            <h3 className="prodctde-content">
                              {props.product_country_ch}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col mt-2">
                        <div className="row">
                          <div className="col-3">
                            <h3 className="productbox-line-r">容量</h3>
                          </div>
                          <div className="col">
                            <h3 className="prodctde-content">
                              {props.product_capacity}ml
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col mt-2">
                        <div className="row">
                          <div className="col-3">
                            <h3 className="productbox-line-r">濃度</h3>
                          </div>
                          <div className="col">
                            <h3 className="prodctde-content">
                              {`${props.product_alcohol * 100}%`}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4 text-center text-md-start">
                      <h4
                        className="product-discrip"
                        dangerouslySetInnerHTML={{
                          __html: props.product_description
                            .replace(/<br>/g, '\n')
                            .replace(/<\/?[^>]+>/gi, ''),
                        }}
                      ></h4>
                    </div>
                    <div className="row">
                      <div className="row mt-4">
                        <h1 className="price  text-start">
                          TWD {props.product_price}
                        </h1>
                      </div>
                    </div>

                    <Counter productId={props.productId} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- section-right --> */}
        </div>
      </div>
    </>
  )
}

export default Productinfo