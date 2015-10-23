# JavaScript-scrollfix
javascript scrollfix

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
