<template>
  <div class="outter">
    <div class="add-complaint">
      <div class="add-title">
        新建投诉任务
      </div>
      <el-row :gutter="220" class="row-style" >
        <el-col :span="4">
          <el-card shadow="hover" body-style="height: 150px" class="card-style" >
            <div class="card-inner">
              人行系统转来投诉
            </div>  
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" body-style="height: 150px" class="card-style">
            <div class="card-inner">
              银保监护系统转来投诉
            </div>    
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" body-style="height: 150px" class="card-style">
            <div class="card-inner">
              国家信访系统转来投诉
            </div>  
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" body-style="height: 150px" class="card-style">
            <div class="card-inner">
              总分支行现场投诉
            </div>  
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" body-style="height: 150px" class="card-style">
            <div class="card-inner">
              其他投诉
            </div>  
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="add-complaint">
      <div class="add-title">
        网络及Email投诉确认
      </div>
      <el-row :gutter="220" class="row-style">
        <el-col :span="4">
          <el-card shadow="hover" body-style="height: 150px" class="card-style">
            <div class="card-inner">
              监管部门转来Email投诉待确认
            </div>  
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" body-style="height: 150px" class="card-style">
            <div class="card-inner">
              客户Email自助网络投诉待确认
            </div>    
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="add-complaint">
      <div class="add-title">
        报备与表扬
      </div>
      <el-row :gutter="220" class="row-style">
        <el-col :span="4">
          <el-card shadow="hover" body-style="height: 150px" class="card-style">
            <div class="card-inner">
              新建报备
            </div>  
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" body-style="height: 150px" class="card-style">
            <div class="card-inner">
              新建表扬
            </div>    
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>


</script>

<style>
.outter {
  padding: 20px;
  background-color: white;
  margin: auto;
  margin-top: 10px;
}

.card-style {
  background-color: rgb(228, 228, 228, 0.2);
  border: none;
  border-radius: 5px;
}

.card-inner {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-card__body {
  padding: 0;
}

.row-style {
  margin: 15px 0 15px 0;
}

.el-card {
  width: 200px;
} 
</style>