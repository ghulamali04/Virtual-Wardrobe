<?php
if(@$_GET['loadSwatches'] == '1') {
    $jsonSwatches = file_get_contents('./swatches.json');
    $swatches = json_decode($jsonSwatches); 
}
?>
<div class="row">
                                <div class="col-md-12">
                                    <h4>Door Range: </h2>
                                    <hr>
                                </div>
                            </div>
                            <?php
                                foreach ($swatches->PROFILES as $key => $pf) {
                            ?>
                            <div class="row">
                                <div class="col-md-12 ">
                                    <div class="form-check-profile form-check form-check-inline">
                                        <input data-profile-key="<?php echo $key ?>" <?php echo $key == 0 ? 'checked' : '' ?> class="form-check-input" type="radio" name="track_profile" id="track_profile_<?php echo $key ?>" value="<?php echo $pf->NAME ?>">
                                        <label class="form-check-label" for="track_profile_<?php echo $key ?>"><?php echo $pf->NAME ?></label>
                                    </div>
                                    <?php   if(isset($pf->OPTIONS)){ 
foreach($pf->OPTIONS as $k=>$pop){
                                        ?>
                                                <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" data-profile-key="<?php echo $key ?>" name="frame_options<?php echo $key ?>" id="frame_options<?php echo $key ?><?php echo $k ?>" data-index="<?php echo $k ?>" value="<?php echo $pop ?>">
  <label class="form-check-label" for="frame_options<?php echo $key ?><?php echo $k ?>"><?php echo $pop ?></label>
</div>
 
                                    <?php 
}
                                }?>
                                </div>
                                <?php
                                    foreach ($pf->TRACKS as $track_key => $track) {
                                ?>

                                <?php if ($pf->NAME != $track->TRACK_TYPE && count($track->COLORS) > 1): ?>
                                <div class="col-md-12">
                                    <h6 style="font-size: .75rem"><?php echo $track->TRACK_TYPE ?></h6>
                                </div>
                                <?php endif; ?>

                                <div class="col-md-12 d-flex">
                                <?php
                                    foreach ($track->COLORS as $color_key => $color) {
                                ?>
                                <div class="form-check-img form-check form-check-inline mb-3">
                                    <input <?php echo $key == 0 && $track_key == 0 && $color_key == 1 ? 'checked' : '' ?> type="radio" name="track_color" id="track_color_<?php echo $key . "_" . $track_key . "_" . $color_key ?>" data-src="<?php echo $color->SRC ?>" data-profile-key="<?php echo $key ?>" data-track-key="<?php echo $track_key ?>" data-color-key="<?php echo $color_key ?>" class="radio-img">
                                    <label for="track_color_<?php echo $key . "_" . $track_key . "_" . $color_key ?>" class="label-img d-flex flex-column align-items-center justify-content-center">
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
                            <?php
                            }
                            ?>