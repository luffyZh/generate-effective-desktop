const finalObj = {
  screenWidth: window.screen.width * window.devicePixelRatio,
  screenHeight: window.screen.height * window.devicePixelRatio,
  selectType: 'table',
  tableArr: [
    {
      text: '应用',
      color: '#ffc0cb'
    }, {
      text: '文档',
      color: '#00bfff'
    }, {
      text: '已完成',
      color: '#40e0d0'
    }, {
      text: '未完成',
      color: '#ffdd57'
    }
  ],
  rowArr: [
  {
      text: '应用',
      color: '#ffc0cb'
    }, {
      text: '文档',
      color: '#00bfff'
    }, {
      text: '已完成',
      color: '#40e0d0'
    }, {
      text: '未完成',
      color: '#ffdd57'
    }
  ],
  columnArr: [
  {
      text: '应用',
      color: '#ffc0cb'
    }, {
      text: '文档',
      color: '#00bfff'
    }, {
      text: '已完成',
      color: '#40e0d0'
    }, {
      text: '未完成',
      color: '#ffdd57'
    }
  ]
}
// 手动填写屏幕分辨率
function getScreenParam(_this, type) {
  switch(type) {
    case 'width': {
      finalObj.screenWidth = parseInt(_this.value, 10);
      break;
    }
    case 'height': {
      finalObj.screenHeight = parseInt(_this.value, 10);
      break;
    }
    default:
  }
}
// 修改文本的变化
function inputTextChange(_this, type, index) {
  switch(type) {
    case 'table': {
      finalObj.tableArr[index - 1].text = _this.value;
      break;
    }
    case 'row': {
      finalObj.rowArr[index - 1].text = _this.value;
      break;
    }
    case 'column': {
      finalObj.columnArr[index - 1].text = _this.value;
      break;
    }
    default:
  }
}
// 修改颜色值的变化
function inputColorChange(_this, type, index) {
  switch(type) {
    case 'table': {
      finalObj.tableArr[index - 1].color = _this.value;
      break;
    }
    case 'row': {
      finalObj.rowArr[index - 1].color = _this.value;
      break;
    }
    case 'column': {
      finalObj.columnArr[index - 1].color = _this.value;
      break;
    }
    default:
  }
}
// 修改选择的类型
function changeSelectType(type) {
  finalObj.selectType = type;
  const checkboxElems = Array.from(document.getElementsByClassName('checkbox'));
  checkboxElems.forEach(item => {
    item.className = 'checkbox';
    if (item.getAttribute('name') === type) {
      item.className += ' checkbox-selected';
    }
  });
}
// 生成预览图片
function previewDesktop() {
  const childElems = Array.from(document.getElementById(`preview-${finalObj.selectType}`).children);
  childElems.forEach((item, index) => {
    item.style.backgroundColor = finalObj[`${finalObj.selectType}Arr`][index].color;
    item.innerHTML = 
      `<div style="display:flex;just-content:center;align-items:center;color:#fff">
        <h1 style="font-weight:bold;font-size:1.6em">${finalObj[`${finalObj.selectType}Arr`][index].text}</h1>
      <div>`
    });
  document.getElementById(`preview-${finalObj.selectType}`).style.display = 'flex';
}
// 生成下载图片
function generateDesktop() {
  const downloadDom = document.getElementById(`download-${finalObj.selectType}`);
  downloadDom.style.width = finalObj.screenWidth / 2 + 'px';
  downloadDom.style.height = finalObj.screenHeight / 2 + 'px';
  const childElems = Array.from(downloadDom.children);
  childElems.forEach((item, index) => {
    item.style.backgroundColor = finalObj[`${finalObj.selectType}Arr`][index].color;
    item.innerHTML = 
      `<div style="display:flex;just-content:center;align-items:center;color:#fff">
        <h1 style="font-weight:bold;font-size:1.6em">${finalObj[`${finalObj.selectType}Arr`][index].text}</h1>
      <div>`
  });
  convert2canvas(downloadDom);
}
// 预览的时候点击消失
Array.from(document.getElementsByClassName('preview')).forEach(item => {
  item.addEventListener('click', function(e) {
    e.target.parentNode.style.display = 'none';
  });
});
// 将html转换成canvas
function convert2canvas(targetDom) {
  const width = parseInt(targetDom.style.width, 10); //获取dom 宽度
  const height = parseInt(targetDom.style.height, 10); //获取dom 高度
  const canvas = document.createElement("canvas"); //创建一个canvas节点
  const scale = window.devicePixelRatio; //定义任意放大倍数 支持小数
  canvas.width = width * scale; //定义canvas 宽度 * 缩放
  canvas.height = height * scale; //定义canvas 高度 *缩放
  canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 
  const opts = {
      scale: scale, // 添加的scale 参数
      canvas: canvas, //自定义 canvas
      width: width, //dom 原始宽度
      height: height,
      useCORS: true // 【重要】开启跨域配置
  };

  html2canvas(targetDom, opts).then(canvas => {
    targetDom.style.display = 'none';
    var context = canvas.getContext('2d');
    // 【重要】关闭抗锯齿
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
      /* ... your canvas manipulations ... */
    if (canvas.toBlob) {
      canvas.toBlob(
        function (blob) {
          saveAs(blob, 'Effective-Desktop.png');
        },
        'image/png'
      );
    }
  });
}