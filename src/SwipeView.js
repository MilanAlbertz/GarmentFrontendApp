import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TinderCard from 'react-tinder-card'
import Card from './Card';

function SwipeView() {
  const [items, setItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const position = new Animated.ValueXY();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5256/api/Garment/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setItems(data);
          } catch (error) {
      console.error('Error fetching data:', error);
      const mockData = [
        {
          "id": 2,
          "name": "Manfinity Hypemode Men Cartoon Graphic Tee",
          "price": 8.68,
          "siteUrl": "https://shein.com/Manfinity-Hypemode-Men-Cartoon-Graphic-Tee-p-10170797-cat-1980.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 1,
              "url": "http://img.ltwebstatic.com/images3_pi/2022/05/17/16527770714d42b4cffcd33c7c0d718a52c1f973b1_thumbnail_405x552.jpg"
            },
            {
              "id": 2,
              "url": "http://img.ltwebstatic.com/images3_pi/2022/04/04/16490811007e9f7a8a8073cd8e80db6900e3104db9_thumbnail_405x552.jpg"
            },
            {
              "id": 3,
              "url": "http://img.ltwebstatic.com/images3_pi/2022/04/04/1649081098026e396feb9dbab6cfa87a62c357e1b1_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 3,
          "name": "Foldover Off Shoulder Trumpet Sleeve Crop Sweat...",
          "price": 16.17,
          "siteUrl": "https://shein.com/Foldover-Off-Shoulder-Trumpet-Sleeve-Crop-Sweater-p-24741997-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 4,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/17/18/16975097626a768d5eeddabfdcde918971814396d5_thumbnail_405x552.jpg"
            },
            {
              "id": 5,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/17/1f/1697509764fc5aa5826145a206cf62c142bf6b0c2e_thumbnail_405x552.jpg"
            },
            {
              "id": 6,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/17/21/1697509766237ee991bda8bfd4ef15d7e3285759b1_thumbnail_405x552.jpg"
            },
            {
              "id": 7,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/17/8c/1697509769053a3f1ff1a342177ddf13f0b2a71a18_thumbnail_405x552.jpg"
            },
            {
              "id": 8,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/17/52/16975097715f5337fa3b2c1696b695ef9b60260657_thumbnail_405x552.jpg"
            },
            {
              "id": 9,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/17/fb/16975097738d1a9d9b766ad69f51fde6263219a4e8_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 4,
          "name": "ROMWE Fairycore Women'S Bee Embroidered Drop Sh...",
          "price": 15.9,
          "siteUrl": "https://shein.com/ROMWE-Fairycore-Women-S-Bee-Embroidered-Drop-Shoulder-Half-Turtleneck-Sweater-p-26474689-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 10,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/27/f9/1698402640ae7399b96d7bae220f30a005e694e288_thumbnail_405x552.jpg"
            },
            {
              "id": 11,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/27/87/169840264226fcc81eea993d3a71dc33b8c204af34_thumbnail_405x552.jpg"
            },
            {
              "id": 12,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/27/55/169840264599965e2df2e7698980e48da4d088f085_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 5,
          "name": "Striped Drop Shoulder Sweater",
          "price": 14.62,
          "siteUrl": "https://shein.com/Striped-Drop-Shoulder-Sweater-p-4657102-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 13,
              "url": "http://img.ltwebstatic.com/images3_pi/2021/10/09/16337706423b2a18ffb7585efd447f5c542f171639_thumbnail_405x552.jpg"
            },
            {
              "id": 14,
              "url": "http://img.ltwebstatic.com/images3_pi/2021/10/09/16337706448746f81175cd7efc95fff7dbaf5de7b4_thumbnail_405x552.jpg"
            },
            {
              "id": 15,
              "url": "http://img.ltwebstatic.com/images3_pi/2021/10/09/1633770647effa538c4392ae26982bef19ec1b8c62_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 6,
          "name": "SHEIN Essnce 3pcs Solid High Neck Long Sleeve B...",
          "price": 49.63,
          "siteUrl": "https://shein.com/SHEIN-Essnce-3pcs-Solid-High-Neck-Long-Sleeve-Basic-Brushed-Fleece-Lined-Sweater-p-24171961-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 16,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/31/5a/1698753621b9e8693dd9fbdc667c71c8e4c458b21e_thumbnail_405x552.jpg"
            },
            {
              "id": 17,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/31/5c/1698753626f7a2907009d6a8271859dff83c6bf163_thumbnail_405x552.jpg"
            },
            {
              "id": 18,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/31/9e/1698753628d9a820bf176c6ec6bb6c5ad5f13c4031_thumbnail_405x552.jpg"
            },
            {
              "id": 19,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/31/57/16987536301e2700fb548121df5d6c8efe6f31f251_thumbnail_405x552.jpg"
            },
            {
              "id": 20,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/31/48/16987536349b9e398c8a25609748715fb5030301b1_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 7,
          "name": "SHEIN LUNE Casual Women's Batwing Sleeve Sweate...",
          "price": 16.81,
          "siteUrl": "https://shein.com/SHEIN-LUNE-Casual-Women-s-Batwing-Sleeve-Sweater-p-26948235-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 21,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/11/29/61/170122213264f4fe61e6ab760f3d1aa61a2edd26ec_thumbnail_405x552.jpg"
            },
            {
              "id": 22,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/11/29/41/170122214036add41ad68be94396555c64d326494a_thumbnail_405x552.jpg"
            },
            {
              "id": 23,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/11/29/f6/17012221440890b0c1ee99474aaed06f37d826843e_thumbnail_405x552.jpg"
            },
            {
              "id": 24,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/11/29/31/17012221530ab81872115b9705051d99708f329bfb_thumbnail_405x552.jpg"
            },
            {
              "id": 25,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/11/29/15/1701222157c1eaedf499da11803b7743f48cfc501d_thumbnail_405x552.jpg"
            },
            {
              "id": 26,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/11/29/ba/1701222164648930e8b532cf8878138e8aea1f0bf6_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 8,
          "name": "SHEIN Coolane Letter Pattern Drop Shoulder Swea...",
          "price": 20.84,
          "siteUrl": "https://shein.com/SHEIN-Coolane-Letter-Pattern-Drop-Shoulder-Sweater-p-24426789-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 27,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/11/e8/169699041595a23d05d27dc572ba8c13a67b5c296f_thumbnail_405x552.jpg"
            },
            {
              "id": 28,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/11/82/1696990417d601ae437fc2f7e73c236e5c48ba10e4_thumbnail_405x552.jpg"
            },
            {
              "id": 29,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/11/7c/1696990419dcf20492b8d7e7e476fb70b0f140d584_thumbnail_405x552.jpg"
            },
            {
              "id": 30,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/11/2a/1696990422012ce514dd6c614e2168af683a5dd02f_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 9,
          "name": "Solid Off Shoulder Ribbed Knit Sweater",
          "price": 11.42,
          "siteUrl": "https://shein.com/Solid-Off-Shoulder-Ribbed-Knit-Sweater-p-23450399-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 31,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/09/21/52/1695260135d9eaec454a1869b38172c20de49df965_thumbnail_405x552.jpg"
            },
            {
              "id": 32,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/09/21/98/1695260137491495acf0693dae2bfedd785e736d74_thumbnail_405x552.jpg"
            },
            {
              "id": 33,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/09/21/4d/1695260139aa04b3f707b907102371fbabaffbe125_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 10,
          "name": "ROMWE Grunge Punk Eye Pattern Drop Shoulder Swe...",
          "price": 15.9,
          "siteUrl": "https://shein.com/ROMWE-Grunge-Punk-Eye-Pattern-Drop-Shoulder-Sweater-p-21734089-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 34,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/07/29/16906144539a13824fa7fa3e4830db6ee3c7ec5adc_thumbnail_405x552.jpg"
            },
            {
              "id": 35,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/07/29/16906144559acfc7b91c6369c231b249707cc32fb7_thumbnail_405x552.jpg"
            },
            {
              "id": 36,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/07/29/169061445763356ac6b70b9f1cefb2bfcb0963172e_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 11,
          "name": "SHEIN Essnce Color Block Drop Shoulder Sweater",
          "price": 14.62,
          "siteUrl": "https://shein.com/SHEIN-Essnce-Color-Block-Drop-Shoulder-Sweater-p-23453359-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 37,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/09/12/1f/1694484726424ec911f608982696fb872028b1cf53_thumbnail_405x552.jpg"
            },
            {
              "id": 38,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/09/12/0d/1694484729795a7e86c8ed8c892e538d802095c058_thumbnail_405x552.jpg"
            },
            {
              "id": 39,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/09/12/4c/1694484732d2132f66ca6feddec31c37ca956ccef9_thumbnail_405x552.jpg"
            },
            {
              "id": 40,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/09/12/2d/169448473480bcc646c57b804301d713747cf418d3_thumbnail_405x552.jpg"
            },
            {
              "id": 41,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/09/12/4b/1694484737d3dcaa2c154cd6b6ef3a3cb72c19299e_thumbnail_405x552.jpg"
            },
            {
              "id": 42,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/09/12/ee/1694484739e47d59f5376b31df63acf5271b29aa79_thumbnail_405x552.jpg"
            },
            {
              "id": 43,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/09/12/13/169448474240776b43ebb33f9dc2f718882ab92458_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 12,
          "name": "SHEIN BIZwear Turtleneck Ribbed Knit Sweater Wo...",
          "price": 10.05,
          "siteUrl": "https://shein.com/SHEIN-BIZwear-Turtleneck-Ribbed-Knit-Sweater-Workwear-p-1712364-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 44,
              "url": "http://img.ltwebstatic.com/images3_pi/2020/10/14/160265520594f73ad7f432c0ed885a773d3b33f6ab_thumbnail_405x552.jpg"
            },
            {
              "id": 45,
              "url": "http://img.ltwebstatic.com/images3_pi/2020/10/14/1602655207d68369b1596a4972a875bcee9541912a_thumbnail_405x552.jpg"
            },
            {
              "id": 46,
              "url": "http://img.ltwebstatic.com/images3_pi/2020/10/14/1602655210d00f08830bdac8b355860416f8bfa5fe_thumbnail_405x552.jpg"
            },
            {
              "id": 47,
              "url": "http://img.ltwebstatic.com/images3_pi/2020/10/14/160265521206d015811df019beab66fbe90b70e56a_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 13,
          "name": "Solid Drop Shoulder Crop Ribbed Knit Sweater",
          "price": 17,
          "siteUrl": "https://shein.com/Solid-Drop-Shoulder-Crop-Ribbed-Knit-Sweater-p-25763380-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 48,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/11/01/e9/169880174449772c14cbca3fb424140c1ea2d37b9a_thumbnail_405x552.jpg"
            },
            {
              "id": 49,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/11/01/81/1698801746b39f571b12c51cd129694c6b358b2004_thumbnail_405x552.jpg"
            },
            {
              "id": 50,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/11/01/ee/1698801749b8acfd68e03d15ff11be0f588ca7713c_thumbnail_405x552.jpg"
            },
            {
              "id": 51,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/11/01/7e/1698801752377c29e55d886dae948eadbf94bfbc73_thumbnail_405x552.jpg"
            },
            {
              "id": 52,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/11/01/22/169880175509fba856a4384306cb27f2566bc948c1_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 14,
          "name": "SHEIN Frenchy Turtleneck Raglan Sleeve Split He...",
          "price": 22.94,
          "siteUrl": "https://shein.com/SHEIN-Frenchy-Turtleneck-Raglan-Sleeve-Split-Hem-Sweater-p-11637362-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 53,
              "url": "http://img.ltwebstatic.com/images3_pi/2022/10/06/1665027738be0898a077b90fac58a971c06ca20682_thumbnail_405x552.jpg"
            },
            {
              "id": 54,
              "url": "http://img.ltwebstatic.com/images3_pi/2022/10/06/16650277408bfb34a1f069906b8c2ad11ddcadc7cc_thumbnail_405x552.jpg"
            },
            {
              "id": 55,
              "url": "http://img.ltwebstatic.com/images3_pi/2022/10/06/1665027742772b8185725ca8b2c967338eed84bad6_thumbnail_405x552.jpg"
            },
            {
              "id": 56,
              "url": "http://img.ltwebstatic.com/images3_pi/2022/10/06/16650277454b69a9f2a2db0edff3c23e2f00a6f90d_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 15,
          "name": "SHEIN ICON Solid Super Crop Sweater",
          "price": 8.22,
          "siteUrl": "https://shein.com/SHEIN-ICON-Solid-Super-Crop-Sweater-p-11543162-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 57,
              "url": "http://img.ltwebstatic.com/images3_pi/2022/09/22/1663823144308ac791a65e79d9b6cf33c70c4b676b_thumbnail_405x552.jpg"
            },
            {
              "id": 58,
              "url": "http://img.ltwebstatic.com/images3_pi/2022/09/22/16638231450882e3a2b53fa235b64c39f7144157d6_thumbnail_405x552.jpg"
            },
            {
              "id": 59,
              "url": "http://img.ltwebstatic.com/images3_pi/2022/09/22/16638231474af85161d2058c7cd3c488b5dc36164d_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 16,
          "name": "SHEIN EZwear Flag Pattern Sweater",
          "price": 18.28,
          "siteUrl": "https://shein.com/SHEIN-EZwear-Flag-Pattern-Sweater-p-21995407-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 60,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/08/24/b3/1692847158e835ee4db0de0a3586718c54655518e1_thumbnail_405x552.jpg"
            },
            {
              "id": 61,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/08/24/1b/16928471647dc5b4080f5d3e7ac18c7921709ee5d1_thumbnail_405x552.jpg"
            },
            {
              "id": 62,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/08/24/a4/16928471702be0725e5c30358c9961798e8c11737e_thumbnail_405x552.jpg"
            },
            {
              "id": 63,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/08/24/8d/1692847176d9f4508602592c2a1650affce4c1ec48_thumbnail_405x552.jpg"
            },
            {
              "id": 64,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/08/24/91/1692847181cecb7ed4019dce976b4b0816d0e22966_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 17,
          "name": "SHEIN LUNE Striped Pattern Drop Shoulder Sweate...",
          "price": 16.45,
          "siteUrl": "https://shein.com/SHEIN-LUNE-Striped-Pattern-Drop-Shoulder-Sweater-p-23162617-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 65,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/08/18/2a/1692321640e7e9a0f6e9484a6a5f0bc2af6ac4cc37_thumbnail_405x552.jpg"
            },
            {
              "id": 66,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/08/18/25/1692321643afc5f793c18a935adfadabc9f873ca2d_thumbnail_405x552.jpg"
            },
            {
              "id": 67,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/08/18/10/169232164663b8072a740c3c232ba5476b19a896eb_thumbnail_405x552.jpg"
            },
            {
              "id": 68,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/08/18/be/1692321648a4bd8edc3697d89f06cce9b6ee1a3a22_thumbnail_405x552.jpg"
            },
            {
              "id": 69,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/08/18/a5/16923216525c6d6bc6c9fff45acddda675b0560003_thumbnail_405x552.jpg"
            },
            {
              "id": 70,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/08/18/bc/16923216559384b5c559d23ce8bfc103274d4cc54a_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 18,
          "name": "Striped Pattern Drop Shoulder Crop Sweater",
          "price": 12.79,
          "siteUrl": "https://shein.com/Striped-Pattern-Drop-Shoulder-Crop-Sweater-p-24258412-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 71,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/08/40/16967515768e0af4a737007ae5ff8e12847ea2c588_thumbnail_405x552.jpg"
            },
            {
              "id": 72,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/07/7e/1696643989e28d87a9696ac06d583eaee095cd22f2_thumbnail_405x552.jpg"
            },
            {
              "id": 73,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/07/54/16966439914d9159a24785ff401713e7c07ba3c2bc_thumbnail_405x552.jpg"
            },
            {
              "id": 74,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/07/1a/16966439945d570110c37e90fdd6fa32bf6e7cb9ee_thumbnail_405x552.jpg"
            },
            {
              "id": 75,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/07/61/169664399639cf9ff748aca7133aa0a945edc86dea_thumbnail_405x552.jpg"
            }
          ]
        },
        {
          "id": 19,
          "name": "SHEIN Essnce Striped Trim Cable Knit Drop Shoul...",
          "price": 16.45,
          "siteUrl": "https://shein.com/SHEIN-Essnce-Striped-Trim-Cable-Knit-Drop-Shoulder-Sweater-p-24031105-cat-1734.html",
          "tags": [],
          "imageUrls": [
            {
              "id": 76,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/04/13/16963919966175e267c2825d4dae4c21620f392cff_thumbnail_405x552.jpg"
            },
            {
              "id": 77,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/04/92/16963919990406695c39a1e32c8cb7d2bc4307e13f_thumbnail_405x552.jpg"
            },
            {
              "id": 78,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/04/d3/16963920019edc124de90a36c764a5493245827cb3_thumbnail_405x552.jpg"
            },
            {
              "id": 79,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/04/02/16963920034d66b0e8081619c0302838468335ade6_thumbnail_405x552.jpg"
            },
            {
              "id": 80,
              "url": "http://img.ltwebstatic.com/images3_pi/2023/10/04/5d/169639200653c1c0087c7e17a4945d19f78b42b4eb_thumbnail_405x552.jpg"
            }
          ]
        },
      ]
      
setItems(mockData);
    }
  };
  return (
    <LinearGradient colors={['#424242', '#A20000']} style={{ flex: 1 }}>
    <View style={styles.centeredContent}>
        {items.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SwipeView;