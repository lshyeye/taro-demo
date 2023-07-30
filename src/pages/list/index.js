import { View, Text, Button, Swiper , Image , SwiperItem  } from "@tarojs/components";
import { Component } from "react";
import Taro, { useState } from "@tarojs/taro";
import './index.css'

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      files: [],
      setFiles: [],
      picNum:0,
      selection:false
      // checked:false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  //  handleClick() {
  //   // console.log(this.state.clicked);
  //   this.setState({
  //     // checked:!this.state.checked
  //     // clicked:!this.state.clicked
  //     clicked:true
  //   })
  //   // console.log(this.state.clicked);
  //   // console.log(1111);
  //  }
  handleClick = async () => {
    const res = await Taro.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType:['album']
    });
    //  res 对象 
//     {errMsg: "chooseImage:ok", tempFilePaths: Array(2), tempFiles: Array(2)}
// errMsg: "chooseImage:ok"
// tempFilePaths: (2) ["http://tmp/obKv7h9rHoCm3f2721f4145ffa2f608613b2b6ad2f1e.jpg", "http://tmp/Y0Vx1x9GDM3d3f2721f4145ffa2f608613b2b6ad2f1e.jpg"]
// tempFiles: Array(2)
// 0: {path: "http://tmp/obKv7h9rHoCm3f2721f4145ffa2f608613b2b6ad2f1e.jpg", size: 233399}
// 1: {path: "http://tmp/Y0Vx1x9GDM3d3f2721f4145ffa2f608613b2b6ad2f1e.jpg", size: 233399}
// length: 2
// nv_length: (...)
// __proto__: Array(0)
// __proto__: Object
  // console.log(res);

// 只会选取三张

  //  console.log(res.tempFiles.length);
    if (this.state.files.length + res.tempFiles.length  >3 || res.tempFiles.length >3) {
      Taro.showToast({
        title: '图片超过三张咯~',
        icon: 'error',
        duration: 2000
      })    
    }else{
  
    this.setState({
      picNum: this.state.picNum+=res.tempFiles.length,
      files: [...this.state.files,...res.tempFiles],
      clicked: this.state.clicked = true
    },()=>{
      console.log(this.state.files);
      console.log(this.state.clicked);
      // console.log(this.state.files.length);
      // console.log(this.state.setFiles);
      console.log(this.state.picNum);

    })
  }
    
  };
  // 拍照上传
  cameraClick= async () => {
    const res = await Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType:['camera']
    });
    console.log(res);
    this.setState({
      picNum: this.state.picNum += res.tempFiles.length,
      files: [...this.state.files,...res.tempFiles],
      clicked: this.state.clicked = true
    },()=>{
      console.log(this.state.files);
      console.log(this.state.clicked);
      // console.log(this.state.files.length);
      // console.log(this.state.setFiles);
      console.log(this.state.picNum);

    })

  }

  render() {
    const { clicked,files,picNum } = this.state;
    return (
      <View className='index'>
        <Button onClick={this.handleClick}> 点击上传文件</Button>
        <Button onClick={this.cameraClick}> 拍照</Button>
        <View>clicked的状态：{clicked.toString()}</View>
        {clicked&&(
          <Swiper circular indicatorColor='#E6E6E6' indicatorActiveColor='indicatorActiveColor'>
          {this.state.files.map((item,index) => (
            <SwiperItem key = {index} className='swiper-item'>
              <Image src={item.path} mode='aspectFit' onClick={this.imageClick}></Image>
            </SwiperItem>
            ))}
            </Swiper>
          ) 
        }
      </View>

    );

  }
}
