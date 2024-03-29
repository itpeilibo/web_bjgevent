$(function () {
  const initArtCateList = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        // 调用 template
        const htmlStr = template('tpl-table', res)
        $('tbody').empty().html(htmlStr)
      }
    })
  }
  let indexAdd = null
  initArtCateList()
  
  $("#btnAddCate").click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()

    })

  });
  
  
  // 通过事件委托的方式监听提交事件
  $('html').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('新增文章失败')
        layer.msg('新增文章分类成功！')
        initArtCateList()
        layer.close(indexAdd)
      }
    })
  })
  // 通过代理方式，为 btn-edit 按钮绑定点击事件
  let indexEdit = null;
  $("tbody").on("click", ".btn-edit", function () {
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    const id = $(this).attr("data-id");
    // 发起请求获取对应分类的数据
    $.ajax({
      type: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        layui.form.val("form-edit", res.data);
      },
    });
  });
  $('html').on('submit', '#form-edit',function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('更新分类数据失败')
        layer.msg('更新数据成功')
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })

  // 删除文章分类
  $('tbody').on('click','.btn-delete', function () {
    const id = $(this).attr('data-id');
    layer.confirm("确定删除吗？", { icon: 3, title: "提示" },
      function (index) {
      $.ajax({
        type: "GET",
        url: '/my/article/deletecate/' + id,
        success: function(res){
          if (res.status !== 0) return layer.msg('删除文章失败')
          layer.msg('删除文章成功')
          layer.close(index)
          initArtCateList()
        }
      })
    })
  })
})