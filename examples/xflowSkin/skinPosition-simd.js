function evalSkinPositionSimd (result, pos,boneIdx,boneWeight,boneXform, info)
{
  var r4 = SIMD.float32x4(0.0, 0.0, 0.0, 0.0);

  for(var i = 0; i< info.iterateCount;++i) {
    var offset = i*3;
    r4 = SIMD.float32x4.splat(0.0);
    for(var j = 0; j < 4; j++) {
      var weight = boneWeight[info.iterFlag[2] ? i*4+j : j];
      if (weight) {
        var mo = boneIdx[info.iterFlag[1] ? i*4+j : j]*16;
        var pos4 = SIMD.float32x4.loadXYZ(pos, offset);
        var boneXform0 = SIMD.float32x4.load(boneXform, mo);
        var boneXform1 = SIMD.float32x4.load(boneXform, mo + 4);
        var boneXform2 = SIMD.float32x4.load(boneXform, mo + 8);
        var boneXform3 = SIMD.float32x4.load(boneXform, mo + 12);
        var temp4 = SIMD.float32x4.add(
            SIMD.float32x4.add(
                SIMD.float32x4.mul(boneXform0, SIMD.float32x4.shuffle(pos4, SIMD.XXXX)),
                SIMD.float32x4.mul(boneXform1, SIMD.float32x4.shuffle(pos4, SIMD.YYYY))),
            SIMD.float32x4.add(
                SIMD.float32x4.mul(boneXform2, SIMD.float32x4.shuffle(pos4, SIMD.ZZZZ)),
                boneXform3));
        var w4 = SIMD.float32x4.splat(weight);
        temp4 = SIMD.float32x4.mul(temp4, w4);
        r4 = SIMD.float32x4.add(r4, temp4);
      }
    }
    SIMD.float32x4.storeXYZ(result, offset, r4);
  }
}


Xflow.registerOperator("xflow.skinPositionSimd", {
    outputs: [  {type: 'float3', name: 'result', bufferType: 'simd'}],
    params:  [  {type: 'float3', source: 'pos' , bufferType: 'simd'},
                {type: 'int4', source: 'boneIdx' },
                {type: 'float4', source: 'boneWeight' },
                {type: 'float4x4', source: 'boneXform', bufferType: 'simd' , array: true} ],
                
                
    evaluate: function(result, pos,boneIdx,boneWeight,boneXform, info) {
      evalSkinPositionSimd (result, pos,boneIdx,boneWeight,boneXform, info);
      return;
    }
});
