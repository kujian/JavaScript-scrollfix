# JavaScript-scrollfix
javascript scrollfix
## 插件参数
<table class="pars">
                <tbody><tr>
                  <th width="115">参数名称</th>
                  <th width="120">类型</th>
                    <th width="101">默认值</th>
                    <th width="52">可选</th>
                    <th width="1199">描述</th>
                </tr>
                <tr class="even">
                  <td><span role="presentation">id</span></td>
                  <td>String</td>
                  <td></td>
                  <td>必选</td>
                  <td>固定定位的入口标识</td>
                </tr>
                <tr>
                  <td><span role="presentation">isScroll</span></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>&nbsp;</td>
                  <td>是否滚动到顶部时才fixed</td>
                </tr>
                <tr class="even">
                  <td><span role="presentation">top</span></td>
                  <td>Number</td>
                  <td>0</td>
                  <td></td>
                  <td>isScroll为false时，fixed元素的top位置</td>
                </tr>
                <tr class="even">
                  <td><span role="presentation">limit</span></td>
                  <td>(value|function)</td>
                  <td>0</td>
                  <td></td>
                  <td>设置停止的位置的位置</td>
                </tr>
                <tr>
                  <td><span role="presentation">left</span></td>
                  <td>Number</td>
                  <td>0</td>
                  <td></td>
                  <td>isScroll为false时，fixed元素的left位置</td>
                </tr>  
                <tr class="even">
                  <td><span role="presentation">marginTop</span></td>
                  <td>Number</td>
                  <td>0</td>
                  <td></td>
                  <td>isScroll为true时，fixed元素与顶部的距离</td>
                </tr>
                <tr>
                  <td><span role="presentation">onresize</span></td>
                  <td>Function</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>用于特殊情况，如靠右边的对联广告fixed，右下角底部fixed等，用this指向当前对象，详细使用方法见demo</td>
                </tr>
            </tbody></table>
## 插件属性
<table class="pars">
            <tbody><tr>
              <th width="99">属性名称</th>
              <th width="100">类型</th>
                <th width="1304">描述</th>
            </tr>
            <tr class="even">
                <td><span role="presentation">left</span></td>
                  <td>Number</td>
                  <td>isScroll为false时，重设left值</td>
              </tr>
              <tr>
                <td><span role="presentation">top</span></td>
                  <td>Number</td>
                  <td>isScroll为false时，重设top值</td>
            </tr>

            </tbody></table>
## 插件方法
<table class="pars">
            <tbody><tr>
              <th width="99">方法名称</th>
              <th width="98">参数</th>
              <th width="100">返回值</th>
                <th width="1304">描述</th>
            </tr>
            <tr class="even"><td><span role="presentation">fixStatic</span></td>
                  <td>Function</td>
                  <td></td>
                  <td>当isScroll为false时，需要设置右边对联广告，右下角弹出层等特殊情况时，重新设置resize后正确的left,top值</td>
            </tr></tbody></table>
## 演示
new efix({id:'Jfixboxa',isScroll:true});

<pre>
    new efix({
        id:'Jfixboxb',
        isScroll:true,
        marginTop:60
    });
                    </pre>

<pre>
    new efix({
        id:'Jfixboxc',
        isScroll:false,
        left:0,
        top:180
    });
        </pre>

 <pre>
var fixboxd = 
document.getElementById(
'Jfixboxd');

new efix({
    id:'Jfixboxd',
    isScroll:false,
    top:180,

    left:document.
    documentElement.
    clientWidth - 
    fixboxd.offsetWidth,

    onresize:function(){
        this.left = 
        document.
        documentElement.
        clientWidth - 
        fixboxd.
        offsetWidth;
        this.fixStatic();
    }
});
        </pre>

<pre>
var fixboxf = document.getElementById('Jfixboxf');
new efix({
    id:'Jfixboxf',
    isScroll:false,
    top:document.documentElement.clientHeight - fixboxf.offsetHeight,
    left:document.documentElement.clientWidth - fixboxf.offsetWidth,
    onresize:function(){
        this.left = document.documentElement.clientWidth - fixboxf.offsetWidth;
        this.top = document.documentElement.clientHeight - fixboxf.offsetHeight;
        this.fixStatic();
    }
});
        </pre>

演示见demo.html
