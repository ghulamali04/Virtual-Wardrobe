<?php
if (@$_GET['doorNum'] && @$_GET['frameSrc']) {
    $doorNum = @$_GET['doorNum'];
    $frameSrc = @$_GET['frameSrc'];
    $jsonSwatches = file_get_contents('./swatches.json');
    $swatches = json_decode($jsonSwatches); 
?>
<div class="row" >
    <div class="col-md-12">
        <h4>Door Style: </h2>
        <hr>
    </div>
    <div class="col-md-12">
        <nav class="nav nav-pills nav-doors flex-column flex-sm-row gap-2" id="door_tabs" role="tablist" style="    position: sticky;
    top: 6px;
    width: 100%;
    background: #2d2d2d;
">
        <?php
            for ($i = 1; $i <= intval($doorNum); $i++) {
        ?>
            <a class="flex-sm-fill text-sm-center nav-link <?php echo $i == 1 ? 'active' : '' ?>" id="tab-door-<?php echo $i ?>" data-bs-toggle="pill" data-bs-target="#tab-content-door-<?php echo $i ?>" type="button" role="tab" href="javascript:;" aria-controls="tab-content-door-<?php echo $i ?>" aria-selected="<?php echo $i == 1 ? 'true' : 'false' ?>">Door <?php echo $i ?></a>
        <?php
            }
        ?>
            <a class="flex-sm-fill text-sm-center nav-link " id="tab-door-all" data-bs-toggle="pill" data-bs-target="#tab-content-door-all" type="button" role="tab" href="javascript:;" aria-controls="tab-content-door-all" >All Doors</a>
        </nav>


        <div class="tab-content" id="doors-tabContent">
            <?php
            
                for ($i = 1; $i <= intval($doorNum); $i++) {
            ?>
            <div class="tab-pane fade <?php echo $i == 1 ? 'active show' : '' ?>" id="tab-content-door-<?php echo $i ?>" role="tabpanel" aria-labelledby="tab-door-<?php echo $i ?>" tabindex="0">
                    <div class="container-fluid" style="background: #2d2d2d">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-12 sticky-panel-designer" >
                                        <div class="row">
                                            <div class="col-3">
                                                <div data-panel-designer="<?php echo $i ?>" class="panel-designer mt-3 p-1 d-flex flex-column gap-1" style="background-image: url('<?php echo $frameSrc ?>')"></div>
                                            </div>
                                            <div class="col-9">
                                                <h6 style="font-size: 1rem" class="mt-3">Door Style: </h6>
                                                <div class="d-flex flex-wrap gap-2">
                                                    <div class="panel-style active" data-door-num="<?php echo $i ?>" data-door-style="Type1">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="48" height="80" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="<?php echo $i ?>" data-door-style="Type2">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="48" height="80" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="1" width="48" height="40" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="<?php echo $i ?>" data-door-style="Type3">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="48" height="80" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="1" width="48" height="35" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="46" width="48" height="35" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="<?php echo $i ?>" data-door-style="Type4">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="48" height="80" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="1" width="48" height="27" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="54" width="48" height="27" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="<?php echo $i ?>" data-door-style="Type5">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="48" height="80" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="1" width="48" height="16" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="65" width="48" height="16" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="<?php echo $i ?>" data-door-style="Type6">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="40" height="60" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="61" width="48" height="20" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="41" width="48" height="20" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="21" width="48" height="20" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="1" width="48" height="20" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="<?php echo $i ?>" data-door-style="Type7">
                                                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 82" style="enable-background:new 0 0 50 82;display: block;max-width: 100%;height: auto;" xml:space="preserve">
                                                            <rect x="1" y="1" style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" width="48" height="80"></rect>
                                                            <g>
	                                                        <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="41" x2="1" y2="41"></line>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="1" y1="31" x2="49" y2="31"></line>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="51" x2="1" y2="51"></line>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div class="panel-style" data-door-num="<?php echo $i ?>" data-door-style="Type8">
                                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 82" style="enable-background:new 0 0 50 82;display: block;max-width: 100%;height: auto;" xml:space="preserve">
                                                    <rect x="1" y="1" style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" width="48" height="80"></rect>
                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="16.4" x2="1" y2="16.4"></line>
                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="32.8" x2="1" y2="32.8"></line>
                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="49.2" x2="1" y2="49.2"></line>
                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="65.6" x2="1" y2="65.6"></line>
                                                </svg>
                                            </div>
                                            <div class="panel-style" data-door-num="<?php echo $i ?>" data-door-style="Type9">
                                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 82" style="enable-background:new 0 0 50 82;display: block;max-width: 100%;height: auto;" xml:space="preserve">
                                                    <rect x="1" y="1" style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" width="48" height="80"></rect>
                                                    <g>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="20" x2="1" y2="20"></line>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="30" x2="1" y2="30"></line>
                                                    </g>
                                                    <g>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="52" x2="1" y2="52"></line>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="62" x2="1" y2="62"></line>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                    <?php 
                                        for ($s = 1; $s <= 5; $s++) {
                                    ?>
                                    <div class="col-md-12 mt-3 swatches-panel-split" style="display: <?php echo $s == 1 ? '' : 'none' ?>"  data-panel-split="<?php echo $s ?>" data-door-num="<?php echo $i ?>">
                                        <div class="row">
                                        <?php
                                            foreach ($swatches->PANELS as $panel_key => $panel) {
                                        ?>
                                            <div class="col-md-12">
                                                <h6 style="font-size: .75rem"><?php echo $panel->GROUP ?></h6>
                                            </div>
                                            <div class="col-md-12 d-flex flex-wrap">
                                            <?php
                                                foreach ($panel->COLORS as $color_key => $color) {
                                            ?>
                                                <div class="form-check-img form-check form-check-inline mb-3">
                                                    <input <?php echo $panel_key == 2 && $color_key == 0 ? 'checked' : '' ?> type="radio" name="panel_color_<?php echo $i ?>_<?php echo $s ?>" id="panel_color_<?php echo $panel_key . "_" . $color_key . "_" . $i . "_" . $s ?>" data-src="<?php echo $color->SRC ?>" data-panel-key="<?php echo $panel_key ?>" data-door-num="<?php echo $i ?>" data-panel-split="<?php echo $s ?>" data-color-key="<?php echo $color_key ?>" class="radio-img panel_color">
                                                    <label for="panel_color_<?php echo $panel_key . "_" . $color_key . "_" . $i . "_" . $s ?>" class="label-img d-flex flex-column align-items-center justify-content-center">
                                                        <img src="./<?php echo $color->SRC ?>">
                                                        <span class="radio-img-text"><?php echo $color->NAME ?></span>
                                                    </label>
                                                </div>
                                            <?php
                                            }
                                            ?>
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
                    </div>
            </div>
            <?php
            }
            ?>
            <div class="tab-pane fade " id="tab-content-door-all" role="tabpanel" aria-labelledby="tab-door-all" tabindex="0">
            <div class="container-fluid" style="background: #2d2d2d">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-12 sticky-panel-designer" >
                                        <div class="row">
                                            <div class="col-3">
                                                <div data-panel-designer="all" class="panel-designer mt-3 p-1 d-flex flex-column gap-1" style="background-image: url('<?php echo $frameSrc ?>')"></div>
                                            </div>
                                            <div class="col-9">
                                                <h6 style="font-size: 1rem" class="mt-3">Door Style: </h6>
                                                <div class="d-flex flex-wrap gap-2">
                                                    <div class="panel-style active" data-door-num="all" data-door-style="Type1">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="48" height="80" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="all" data-door-style="Type2">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="48" height="80" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="1" width="48" height="40" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="all" data-door-style="Type3">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="48" height="80" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="1" width="48" height="35" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="46" width="48" height="35" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="all" data-door-style="Type4">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="48" height="80" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="1" width="48" height="27" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="54" width="48" height="27" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="all" data-door-style="Type5">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="48" height="80" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="1" width="48" height="16" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="65" width="48" height="16" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="all" data-door-style="Type6">
                                                        <svg width="50" height="82" viewBox="0 0 50 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1" y="1" width="40" height="60" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="61" width="48" height="20" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="41" width="48" height="20" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="21" width="48" height="20" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                            <rect x="1" y="1" width="48" height="20" fill="#F0F0F0" stroke="#747474" stroke-width="2"></rect>
                                                        </svg>
                                                    </div>
                                                    <div class="panel-style" data-door-num="all" data-door-style="Type7">
                                                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 82" style="enable-background:new 0 0 50 82;display: block;max-width: 100%;height: auto;" xml:space="preserve">
                                                            <rect x="1" y="1" style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" width="48" height="80"></rect>
                                                            <g>
	                                                        <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="41" x2="1" y2="41"></line>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="1" y1="31" x2="49" y2="31"></line>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="51" x2="1" y2="51"></line>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div class="panel-style" data-door-num="all" data-door-style="Type8">
                                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 82" style="enable-background:new 0 0 50 82;display: block;max-width: 100%;height: auto;" xml:space="preserve">
                                                    <rect x="1" y="1" style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" width="48" height="80"></rect>
                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="16.4" x2="1" y2="16.4"></line>
                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="32.8" x2="1" y2="32.8"></line>
                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="49.2" x2="1" y2="49.2"></line>
                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="65.6" x2="1" y2="65.6"></line>
                                                </svg>
                                            </div>
                                            <div class="panel-style" data-door-num="all" data-door-style="Type9">
                                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 82" style="enable-background:new 0 0 50 82;display: block;max-width: 100%;height: auto;" xml:space="preserve">
                                                    <rect x="1" y="1" style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" width="48" height="80"></rect>
                                                    <g>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="20" x2="1" y2="20"></line>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="30" x2="1" y2="30"></line>
                                                    </g>
                                                    <g>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="52" x2="1" y2="52"></line>
	                                                    <line style="fill:#F0F0F0;stroke:#747474;stroke-width:2;" x1="49" y1="62" x2="1" y2="62"></line>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                    <?php 
                                        for ($s = 1; $s <= 5; $s++) {
                                    ?>
                                    <div class="col-md-12 mt-3 swatches-panel-split" style="display: <?php echo $s == 1 ? '' : 'none' ?>"  data-panel-split="<?php echo $s ?>" data-door-num="all">
                                        <div class="row">
                                        <?php
                                            foreach ($swatches->PANELS as $panel_key => $panel) {
                                        ?>
                                            <div class="col-md-12">
                                                <h6 style="font-size: .75rem"><?php echo $panel->GROUP ?></h6>
                                            </div>
                                            <div class="col-md-12 d-flex flex-wrap">
                                            <?php
                                                foreach ($panel->COLORS as $color_key => $color) {
                                            ?>
                                                <div class="form-check-img form-check form-check-inline mb-3">
                                                    <input <?php echo $panel_key == 2 && $color_key == 0 ? 'checked' : '' ?> type="radio" name="panel_color_all_<?php echo $s ?>" id="panel_color_<?php echo $panel_key . "_" . $color_key . "_all_" . $s ?>" data-src="<?php echo $color->SRC ?>" data-panel-key="<?php echo $panel_key ?>" data-door-num="all" data-panel-split="<?php echo $s ?>" data-color-key="<?php echo $color_key ?>" class="radio-img panel_color">
                                                    <label for="panel_color_<?php echo $panel_key . "_" . $color_key . "_all_" . $s ?>" class="label-img d-flex flex-column align-items-center justify-content-center">
                                                        <img src="./<?php echo $color->SRC ?>">
                                                        <span class="radio-img-text"><?php echo $color->NAME ?></span>
                                                    </label>
                                                </div>
                                            <?php
                                            }
                                            ?>
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
                    </div>
            </div>
        </div>

    </div>
</div>
<?php
}
?>
