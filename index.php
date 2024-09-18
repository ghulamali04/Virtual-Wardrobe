<?php
$jsonSwatches = file_get_contents('./swatches.json');
$swatches = json_decode($jsonSwatches);
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>IDS Group</title>
    <link rel="stylesheet" href="./static/css/bootstrap.min.css">
    <link rel="stylesheet" href="./static/css/jquery.bootstrap-touchspin.min.css">
    <link rel="stylesheet" href="./static/css/style.css">
  </head>
  <body>
  <div id="waiting" >
            <img src="./static/img/3dgifmaker20635.gif">
        </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 wizard py-3 mb-4">
                <ul class="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button data-id="0" class="nav-link active d-flex align-items-center justify-content-center" id="pills-sizing-information-tab" data-bs-toggle="pill" data-bs-target="#pills-sizing-information" type="button" role="tab" aria-controls="pills-sizing-information" aria-selected="true">

                            <span class="nav-circle me-2">1</span>
                            <span>SIZING INFORMATION</span>
                            <div class="ms-2">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                            </div>
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button data-id="1" class="nav-link d-flex align-items-center justify-content-center" id="pills-no-of-doors-tab" data-bs-toggle="pill" data-bs-target="#pills-no-of-doors" type="button" role="tab" aria-controls="pills-no-of-doors" aria-selected="false">
<span class="nav-circle me-2">2</span>
                        
    <span>NUMBER OF DOORS</span>
    <div class="ms-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                            </div>
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button data-id="2" class="nav-link d-flex align-items-center justify-content-center" id="pills-frame-style-tab" data-bs-toggle="pill" data-bs-target="#pills-frame-style" type="button" role="tab" aria-controls="pills-frame-style" aria-selected="false">
<span class="nav-circle me-2">3</span>
<span>DOOR RANGE</span>
<div class="ms-2">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                            </div>
                        </button>
                    </li>
                     <li class="nav-item" role="presentation">
                        <button data-id="3" class="nav-link d-flex align-items-center justify-content-center" id="pills-door-style-tab" data-bs-toggle="pill" data-bs-target="#pills-door-style" type="button" role="tab" aria-controls="pills-door-style" aria-selected="false">
<span class="nav-circle me-2">4</span>
                        <span>DOOR STYLE</span>
                        <div class="ms-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                            </div>
                        </button>
                    </li>
                     <li class="nav-item" role="presentation">
                        <button data-id="4" class="nav-link d-flex justify-content-center align-items-center" id="pills-extra-options-tab" data-bs-toggle="pill" data-bs-target="#pills-extra-options" type="button" role="tab" aria-controls="pills-extra-options" aria-selected="false">

<span class="nav-circle me-2">5</span>
                        <span>EXTRA OPTIONS</span>
                        <div class="ms-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                            </div>
                        </button>
                    </li>
                     <li class="nav-item" role="presentation">
                        <button data-id="5" class="nav-link d-flex justify-content-center align-items-center" id="pills-summary-tab" data-bs-toggle="pill" data-bs-target="#pills-summary" type="button" role="tab" aria-controls="pills-summary" aria-selected="false">

<span class="nav-circle me-2">6</span>
                        <span>SUMMARY</span>
                        <div class="ms-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>



    <div class="container">
        <div class="row">
            <div class="col-md-7">
                <div id="container"></div>
            </div>
            <div class="col-md-5 d-flex flex-column">
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-sizing-information" role="tabpanel" aria-labelledby="pills-sizing-information-tab" tabindex="0">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-12">
                                    <h4>What is the space that your wardrobe needs to fill?</h4>
                                    <hr>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <div class="d-flex align-items-center">
                                            <div class="me-3 border border-white" style="border-radius: 8px;padding: 3px 11px;">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                style="fill: #04A081;width: 0.65em;margin-bottom: 2px"
                                                 viewBox="0 0 512 512">
                                                    <path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
                                                </svg>
                                            </div>
                                            <div class="me-4">
                                                <label class="form-label text-nowrap mb-0">Opening Width: </label>
                                            </div>
                                        </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div>
                                            <input type="text" id="opening_width" name="opening_width" value="800">
                                        </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                     <div class="d-flex align-items-center">
                                            <div class="me-3 border border-white" style="border-radius: 8px;padding: 3px 11px;">
                                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                                               style="fill: #04A081;width: 0.65em;height: 0.65em;margin-bottom: 2px">
                                                <path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3V402.7L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7V109.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z"/></svg>
                                            </div>
                                            <div class="me-4">
                                                <label class="form-label text-nowrap mb-0">Opening Height: </label>
                                            </div>
                                        </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    
                                        <div>
                                            <input type="text" id="opening_height" name="opening_height" value="600">
                                        </div>
                                </div>
                                <div class="col-md-12 mb-3">
                                    <p style="font-size: 0.85rem">Please enter your width and height in mm. There are 10mm in 1cm - to convert cm to mm add 0 to the end eg: 233cm = 2330mm</p>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-no-of-doors" role="tabpanel" aria-labelledby="pills-no-of-doors-tab" tabindex="0">
                          <div class="container-fluid">
                              <div class="row">
                                <div class="col-md-12">
                                    <h4>How Many Doors Do You Require?</h4>
                                    <hr>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label text-nowrap mb-0">Amount of doors</label>
                                </div>
                                <div class="col-md-6 mb-3">
                                     <input type="text" id="amount_of_doors" name="amount_of_doors" value="2">
                                </div>
                                <div class="col-md-12 mb-3">
                                    <p style="font-size: 0.85rem">Please enter your width and height in mm. There are 10mm in 1cm - to convert cm to mm add 0 to the end eg: 233cm = 2330mm</p>
                                </div>
                            </div>
                          </div>
                    </div>
                    <div class="tab-pane fade" id="pills-frame-style" role="tabpanel" aria-labelledby="pills-frame-style-tab" tabindex="0">
                        <div class="container-fluid" id="frame_style">
                            <?php include "./frame_style.php" ?>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-door-style" role="tabpanel" aria-labelledby="pills-door-style-tab" tabindex="0">
                        <div class="container-fluid" id="door_style">
                        
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-extra-options" role="tabpanel" aria-labelledby="pills-extra-options-tab" tabindex="0">
                        <div class="container-fluid">
                        <div class="row">
                                <div class="col-md-12">
                                    <h4>Optional extras for your wardrobe</h4>
                                    <hr>
                                </div>
                                <div class="col-md-12">
                                    <p style="font-size:0.85rem">All our wardrobes come with everything you need to install, however some customers like to customise and add OPTIONAL extras to our standard packages. Please note these are OPTIONAL additional accessories which can be used to add to your chosen internals or further customise your wardrobe.</p>
                                </div>
                            </div>
                            <div class="accordion accordion-flush" data-bs-theme="dark" id="accordionExtraOptions">
                                <?php
                                    foreach ($swatches->ADDITIONS as $addition_key => $addition) {
                                ?>
<div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse<?php echo $addition_key ?>" aria-expanded="false" aria-controls="flush-collapse<?php echo $addition_key ?>">
                                            <div class="d-flex">
                                                <div class="extra-option-cover-img me-2" <?php if(@$addition->SPECIAL){ echo "style=margin-left:14px!important;margin-right:25px!important;";} ?>>
                                                    <img src="./<?php echo $addition->SRC ?>" <?php if(@$addition->SPECIAL){ echo "style=width:20px!important;height:70px!important";} ?>>    
                                                </div>
                                                <div>
                                                    <div><?php echo $addition->GROUP ?></div>
                                                    <div class="text-app"><?php echo $addition->PRICE_TAG ?></div>
                                                </div>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="flush-collapse<?php echo $addition_key ?>" class="accordion-collapse collapse" >
                                        <div class="accordion-body">
                                        <?php echo $addition->DESC ?>
                                        <?php
                                            if ($addition->TYPE == 'QTY') {
                                        ?>
                                            <div class="mt-2">
                                                <div class="d-flex align-items-center addition-color-option">
                                                    <div class="me-1">
                                                        <label class="form-label mb-1">Quantity: </label>
                                                    </div>
                                                    <div>
                                                        <select class="form-select form-select-sm" name="addition_qty" data-addition-key="<?php echo $addition_key ?>">
                                                            <option value="0" selected>0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        <?php
                                            }
                                        ?>
                                        <?php
                                        if ($addition->TYPE == 'COLOR') {
                                        ?>
                                            <div class="mt-2">
                                                <div class="d-flex flex-wrap">
                                                    <?php
                                                        foreach ($addition->COLORS as $color_key => $color) {
                                                    ?>
                                                        <div class="d-flex addition-color-option align-items-center mb-2  w-50">
                                                            <div class="me-1">
                                                                <img src="./<?php echo $color->SRC ?>" >
                                                            </div>
                                                            <div class="d-flex flex-column align-items-start w-100">
                                                                <label class="form-label"><?php echo $color->NAME ?></label>
                                                                <select class="form-select form-select-sm w-50" name="addition_color" data-addition-key="<?php echo $addition_key ?>" data-color-key="<?php echo $color_key ?>">
                                                                    <option value="0" selected>0</option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                    <option value="6">6</option>
                                                                    <option value="7">7</option>
                                                                    <option value="8">8</option>
                                                                    <option value="9">9</option>
                                                                    <option value="10">10</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    <?php
                                                        }
                                                    ?>
                                                </div>
                                            </div>
                                        <?php
                                        }
                                        ?>
                                        </div>
                                    </div>
                                </div>
                                <?php
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-summary" role="tabpanel" aria-labelledby="pills-summary-tab" tabindex="0">
                        <div class="container-fluid" id="summary"></div>
                    </div>
                </div>
                <div class="row mt-auto">
                     <div class="col-md-12 mb-3" >
                                    <div style="background-color: #000" class="p-3">
                                        <h4 class="text-end" id="total_price"></h4>
                                    <div class="d-flex justify-content-center align-items-center flex-nowrap" style="gap: 7px">
                                        <button class="btn btn-light w-100 rounded-0 text-uppercase" id="previous-form" disabled="">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg>
                                            <span>Back</span>
                                        </button>
                                        <button class="btn btn-danger w-100 rounded-0 text-uppercase" id="next-form">
                                           <span>Next</span>
                                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg>
                                        </button>
                                    </div>
                                    </div>
                                </div>
                </div>
            </div>
        </div>
    </div>


    <div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast1" class="toast" data-bs-theme="dark" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
    <svg style="width: 1.135em;fill: var(--bs-success)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
      <strong class="me-auto ms-1">Success</strong>
      <small></small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      
    </div>
  </div>

  <div id="liveToast2" class="toast" data-bs-theme="dark" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
    <svg style="width: 1.135em;fill: var(--bs-danger)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
      <strong class="me-auto ms-1">Error</strong>
      <small></small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>


    <script src="./static/js/bootstrap.bundle.js"></script>
    <script src="./static/js/jquery-3.6.0.min.js"></script>
    <script src="./static/js/jquery.bootstrap-touchspin.min.js"></script>
    <script src="./static/js/canvas.min.js"></script>
    <script src="./static/js/app.js"></script>
    <script>
    
    </script>
   
  </body>
</html>