canvas_sprite
=============

概述
------

通过 flash 将远程受许可的图片文件读取到本地，并将其转换为base64的编码格式后载入到 canvas 画布中，通过对其进行编辑最后输出为 png 的合并文件，达到css sprite 的目的

基本使用
-----
*   引入 build 的后的代码和 flash plugin
        
        <script src="../build/swfobject.js"></script>
        <script src="../build/csprite.js"></script>
*   初始化参数，构建主场景
        
    	//场景信息设置
    	sceneOpts = {
    		container: "csprite",
    		tile: {
    			width: 20,
    			height: 20,
    			paddingX: 10,
    			paddingY: 10
    		}
    	};
    
    	//canvas 参数设置
    	canvasOps = {
    		width: 900,
    		height: 600
    	};
    
    	//载入的图片信息设置
    	loaderOps = {
    		resources: [
    			{ src: "http://a.xnimg.cn/imgpro/icons/minigroup/icon_1.gif" },
    			{ src: "http://a.xnimg.cn/imgpro/icons/minigroup/icon_2.gif" },
    			{ src: "http://a.xnimg.cn/imgpro/icons/minigroup/icon_3.gif" },
    			{ src: "http://a.xnimg.cn/imgpro/icons/minigroup/icon_4.gif" }
    		]
    	};
    
    	scene = new Csprite.Scene(sceneOpts, canvasOps, loaderOps);

* 编辑,输出
        var layer = scene.mainLayer;

    	//增加一个图片 feature
    	var imageFeature = new Csprite.Feature.Image(source, {position: Csprite.Helper.calcPostion(scene, layer.featuresContainer.features.length)});
    
    	imageFeature.addListener("loaded", function(e) {
    		layer.addFeature(e.target);
    	});
        
        //输出为png格式图片数据
        var data = scene.saveImage();

安全 说明
--------------
	为了使 flash 获取图片修改的权限，必须为图片服务器增加跨域策略文件