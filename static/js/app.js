class Framer {
    constructor(settings) {
        this.containerId = settings.containerId;
        this.$container = $(`#${this.containerId}`);
        this.minWidth = settings.minWidth;
        this.maxWidth = settings.maxWidth;
        this.minHeight = settings.minHeight;
        this.maxHeight = settings.maxHeight;
        this.doorInfo  = settings.doors.info;
        this.doorNo = settings.doors.doorNo;
        this.minDoor = settings.doors.minDoor;
        this.maxDoor = settings.doors.maxDoor;
        this.initialWidth = settings.initialWidth;
        this.initialHeight = settings.initialHeight;
        this.frameSrc = settings.frameSrc;
        this.doors = [];
        this.stageWidth;
        this.stageHeight;
        this.initialize();
        $(window).resize(() => {
            this.initialize();
        });
    }

    initialize() {
        const containerWidth = this.$container.width();
        const containerHeight = this.$container.height();
        let marginS = containerWidth * 0.075;
        let marginE = containerWidth * 0.069;
        let marginT = containerHeight * 0.20;
        let marginB = containerHeight * 0.281;

        if(this.initialHeight <= this.minHeight) {
            marginT = containerHeight * 0.30
            marginB = containerHeight * 0.40
        } else if (this.initialHeight >= this.maxHeight) {
            marginT = containerHeight * 0.20 
            marginB = containerHeight * 0.281
        } else {
            const heightRatio = (this.initialHeight - this.minHeight) / (this.maxHeight - this.minHeight);
            marginT = containerHeight * (0.30 - (0.30 - 0.20) * heightRatio);
            marginB = containerHeight * (0.40 - (0.40 - 0.281) * heightRatio);
        }

        if (this.initialWidth <= this.minWidth) {
            marginS = containerWidth * 0.40;
            marginE = containerWidth * 0.40;
            if (this.doorNo == null || this.doorNo < this.minDoor || this.doorNo > this.maxDoor) {
                this.doorNo = this.minDoor;
            }
        } else if (this.initialWidth >= this.maxWidth) {
            marginS = containerWidth * 0.075;
            marginE = containerWidth * 0.069;
            if (this.doorNo == null || this.doorNo < this.minDoor || this.doorNo > this.maxDoor) {
                this.doorNo = this.maxDoor;
            }
        } else {
            const rangeWidth = this.maxWidth - this.minWidth;
            const relativeWidth = (this.initialWidth - this.minWidth) / rangeWidth;

            const marginSStart = containerWidth * 0.40;
            const marginSEnd = containerWidth * 0.075;

            const marginEStart = containerWidth * 0.40;
            const marginEEnd = containerWidth * 0.069;

            marginS = marginSStart + (marginSEnd - marginSStart) * relativeWidth;
            marginE = marginEStart + (marginEEnd - marginEStart) * relativeWidth;

            if (this.doorNo == null || this.doorNo < this.minDoor || this.doorNo > this.maxDoor) {
                this.doorNo = Math.round(this.minDoor + (this.maxDoor - this.minDoor) * relativeWidth);
            }
        }

        this.stageWidth = containerWidth - marginS - marginE;
        this.stageHeight = containerHeight - marginT - marginB;

        this.$container.empty();

        this.stage = new Konva.Stage({
            container: this.containerId,
            width: containerWidth,
            height: containerHeight
        });

        this.layer = new Konva.Layer({
            x: marginS,
            y: marginT,
            width: this.stageWidth,
            height: this.stageHeight
        });

        this.stage.add(this.layer);
		this.layer.draw();

		this.main_group = new Konva.Group({
			x: 0,
			y: 0,
			width: this.stageWidth,
			height: this.stageHeight
		})

		this.layer.add(this.main_group)

        const imageObj = new Image();
        imageObj.src = this.frameSrc;

        imageObj.onload = () => {
            const background = new Konva.Image({
                x: 0,
                y: 0,
                width: this.stageWidth,
                height: this.stageHeight,
                image: imageObj
            });

            this.main_group.add(background);
            this.createDoors();
            
        };
    }


    doorType(i, option)
    {
    	const paddingX = 6
    		const paddingY  =  8
    		let doorWidth = 0;
            let doorFrameWidth =0;
            if (this.doorNo === 1) {
                doorWidth = this.stageWidth - (2 * paddingX);
                doorFrameWidth = this.stageWidth
              } else {
                doorWidth = (this.stageWidth - (paddingX * (this.doorNo + 1))) / this.doorNo;
                doorFrameWidth = this.stageWidth / this.doorNo
              }
              const doorFrameHeight = this.stageHeight
        	const doorHeight = doorFrameHeight - (2 * paddingY);
            const paddingBetweenSubGroups = 3

              const doorFrameGroup = new Konva.Group({
                x: i * doorFrameWidth,
                y: 0,
                width: doorFrameWidth,
                height: doorFrameHeight
              })

              this.layer.add(doorFrameGroup)

              const srcObj = new Image();
            srcObj.src = this.frameSrc;

            srcObj.onload = () => {
                const frameRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorFrameWidth,
                    height: doorFrameHeight,
                   	image: srcObj
                });

                doorFrameGroup.add(frameRect);
            };

    		const doorGroup = new Konva.Group({
                x: paddingX + i * (doorWidth + paddingX),
                y: paddingY,
                width: doorWidth,
                height: doorHeight
            });

            this.layer.add(doorGroup);
            const subGroups = [];
    	if (option.splitType == 'Type1') {

            const dObj = new Image();
            dObj.src = option.doorSrc[0];

            dObj.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: doorHeight,
                   	image: dObj
                });

                doorGroup.add(doorRect);
            };

    	}
    	if (option.splitType == 'Type2') {
          
            const subGroupHeight = (doorHeight - paddingBetweenSubGroups) / 2;

            const subGroup1 = new Konva.Group({
            	x: 0,
            	y: 0,
            	width: doorWidth,
            	height: subGroupHeight
            })

            const subGroup2 = new Konva.Group({
            	x: 0,
            	y: subGroupHeight + paddingBetweenSubGroups,
            	width: doorWidth,
            	height: subGroupHeight
            })

            doorGroup.add(subGroup1)
            doorGroup.add(subGroup2)

              const dObj1 = new Image();
            dObj1.src = option.doorSrc[0];

            dObj1.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj1
                });

                subGroup1.add(doorRect)
            };

              const dObj2 = new Image();
            dObj2.src = option.doorSrc[1];

            dObj2.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj2
                });

                subGroup2.add(doorRect)
            };

            subGroups.push(subGroup1)
            subGroups.push(subGroup2)
    	}
    	if (option.splitType == 'Type3') {
    		const middleSubGroupHeight = doorHeight * 0.20;

    		const remainingHeight = doorHeight - middleSubGroupHeight - (2 * paddingBetweenSubGroups)
    		const otherSubGroupHeight = remainingHeight / 2

    		const subGroup1 = new Konva.Group({
    			x: 0,
    			y: 0,
    			width: doorWidth,
    			height: otherSubGroupHeight
    		})

    		const subGroup2 = new Konva.Group({
    			x: 0,
    			y: otherSubGroupHeight + paddingBetweenSubGroups,
    			width: doorWidth,
    			height: middleSubGroupHeight
    		})

    		const subGroup3 = new Konva.Group({
    			x: 0,
    			y: otherSubGroupHeight + middleSubGroupHeight + (2 * paddingBetweenSubGroups),
    			width: doorWidth,
    			height: otherSubGroupHeight
    		})


    		doorGroup.add(subGroup1)
    		doorGroup.add(subGroup2)
    		doorGroup.add(subGroup3)

    		    const dObj1 = new Image();
            dObj1.src = option.doorSrc[0];

    		dObj1.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: otherSubGroupHeight,
                   	image: dObj1
                });

                subGroup1.add(doorRect)
            };

            const dObj2 = new Image();
            dObj2.src = option.doorSrc[1];

    		dObj2.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: middleSubGroupHeight,
                   	image: dObj2
                });

                subGroup2.add(doorRect)
            };

              const dObj3 = new Image();
            dObj3.src = option.doorSrc[2];

    		dObj3.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: otherSubGroupHeight,
                   	image: dObj3
                });

                subGroup3.add(doorRect)
            };
            subGroups.push(subGroup1)
            subGroups.push(subGroup2)
            subGroups.push(subGroup3)
    	}
    	if(option.splitType == 'Type4') {
    		const subGroupHeight = (doorHeight - (paddingBetweenSubGroups * 2)) / 3;

            const subGroup1 = new Konva.Group({
            	x: 0,
            	y: 0,
            	width: doorWidth,
            	height: subGroupHeight
            })

            const subGroup2 = new Konva.Group({
            	x: 0,
            	y: subGroupHeight + paddingBetweenSubGroups,
            	width: doorWidth,
            	height: subGroupHeight
            })

            const subGroup3 = new Konva.Group({
            	x: 0,
            	y: (subGroupHeight * 2) + (paddingBetweenSubGroups * 2),
            	width: doorWidth,
            	height: subGroupHeight
            })

            doorGroup.add(subGroup1)
            doorGroup.add(subGroup2)
            doorGroup.add(subGroup3)

              const dObj1 = new Image();
            dObj1.src = option.doorSrc[0];

            dObj1.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj1
                });

                subGroup1.add(doorRect)
            };

              const dObj2 = new Image();
            dObj2.src = option.doorSrc[1];

            dObj2.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj2
                });

                subGroup2.add(doorRect)
            };

             const dObj3 = new Image();
            dObj3.src = option.doorSrc[2];

            dObj3.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj3
                });

                subGroup3.add(doorRect)
            };

            subGroups.push(subGroup1)
            subGroups.push(subGroup2)
            subGroups.push(subGroup3)
    	}
    	if(option.splitType == 'Type5') {
    		const otherSubGroupHeight = doorHeight * 0.20;

    		const remainingHeight = doorHeight - (otherSubGroupHeight * 2) - (2 * paddingBetweenSubGroups)
    		const middleSubGroupHeight = remainingHeight 

    		const subGroup1 = new Konva.Group({
    			x: 0,
    			y: 0,
    			width: doorWidth,
    			height: otherSubGroupHeight
    		})

    		const subGroup2 = new Konva.Group({
    			x: 0,
    			y: otherSubGroupHeight + paddingBetweenSubGroups,
    			width: doorWidth,
    			height: middleSubGroupHeight,
    		})

    		const subGroup3 = new Konva.Group({
    			x: 0,
    			y: otherSubGroupHeight + middleSubGroupHeight + (paddingBetweenSubGroups * 2),
    			width: doorWidth,
    			height: otherSubGroupHeight
    		})

    		doorGroup.add(subGroup1)
    		doorGroup.add(subGroup2)
    		doorGroup.add(subGroup3)

    const dObj1 = new Image();
            dObj1.src = option.doorSrc[0];

    		dObj1.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: otherSubGroupHeight,
                   	image: dObj1
                });

                subGroup1.add(doorRect)
            };

                const dObj2 = new Image();
            dObj2.src = option.doorSrc[1];

    		dObj2.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: middleSubGroupHeight,
                   	image: dObj2
                });

                subGroup2.add(doorRect)
            };

                const dObj3 = new Image();
            dObj3.src = option.doorSrc[2];

    		dObj3.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: otherSubGroupHeight,
                   	image: dObj3
                });

                subGroup3.add(doorRect)
            };
            subGroups.push(subGroup1)
            subGroups.push(subGroup2)
            subGroups.push(subGroup3)
    	}
    	if (option.splitType == 'Type6') {
    		const subGroupHeight = (doorHeight - (paddingBetweenSubGroups * 3)) / 4;

            const subGroup1 = new Konva.Group({
            	x: 0,
            	y: 0,
            	width: doorWidth,
            	height: subGroupHeight
            })

            const subGroup2 = new Konva.Group({
            	x: 0,
            	y: subGroupHeight + paddingBetweenSubGroups,
            	width: doorWidth,
            	height: subGroupHeight
            })

            const subGroup3 = new Konva.Group({
            	x: 0,
            	y: (subGroupHeight * 2) + (paddingBetweenSubGroups * 2),
            	width: doorWidth,
            	height: subGroupHeight
            })

            const subGroup4 = new Konva.Group({
            	x: 0,
            	y: (subGroupHeight * 3) + (paddingBetweenSubGroups * 3),
            	width: doorWidth,
            	height: subGroupHeight
            })

            doorGroup.add(subGroup1)
            doorGroup.add(subGroup2)
            doorGroup.add(subGroup3)
            doorGroup.add(subGroup4)

              const dObj1 = new Image();
            dObj1.src = option.doorSrc[0];

            dObj1.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj1
                });

                subGroup1.add(doorRect)
            };

              const dObj2 = new Image();
            dObj2.src = option.doorSrc[1];

            dObj2.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj2
                });

                subGroup2.add(doorRect)
            };

             const dObj3 = new Image();
            dObj3.src = option.doorSrc[2];

            dObj3.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj3
                });

                subGroup3.add(doorRect)
            };

            const dObj4 = new Image();
            dObj4.src = option.doorSrc[3];

            dObj4.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj4
                });

                subGroup4.add(doorRect)
            };

            subGroups.push(subGroup1)
            subGroups.push(subGroup2)
            subGroups.push(subGroup3)
            subGroups.push(subGroup4)
    	}
    	if (option.splitType == 'Type7') {
    		const middleSubGroupHeight = doorHeight * 0.20;

    		const remainingHeight = doorHeight - (2 * middleSubGroupHeight) - (3 * paddingBetweenSubGroups)
    		const otherSubGroupHeight = remainingHeight / 2

    		const subGroup1 = new Konva.Group({
    			x: 0,
    			y: 0,
    			width: doorWidth,
    			height: otherSubGroupHeight
    		})

    		const subGroup2 = new Konva.Group({
    			x: 0,
    			y: otherSubGroupHeight + paddingBetweenSubGroups,
    			width: doorWidth,
    			height: middleSubGroupHeight
    		})

    		const subGroup3 = new Konva.Group({
    			x: 0,
    			y: otherSubGroupHeight + middleSubGroupHeight + (2 * paddingBetweenSubGroups),
    			width: doorWidth,
    			height: middleSubGroupHeight
    		})

    		const subGroup4 = new Konva.Group({
    			x: 0,
    			y: otherSubGroupHeight + (2 * middleSubGroupHeight) + (3 * paddingBetweenSubGroups),
    			width: doorWidth,
    			height: otherSubGroupHeight
    		})


    		doorGroup.add(subGroup1)
    		doorGroup.add(subGroup2)
    		doorGroup.add(subGroup3)
    		doorGroup.add(subGroup4)

    		    const dObj1 = new Image();
            dObj1.src = option.doorSrc[0];

    		dObj1.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: otherSubGroupHeight,
                   	image: dObj1
                });

                subGroup1.add(doorRect)
            };

            const dObj2 = new Image();
            dObj2.src = option.doorSrc[1];

    		dObj2.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: middleSubGroupHeight,
                   	image: dObj2
                });

                subGroup2.add(doorRect)
            };

              const dObj3 = new Image();
            dObj3.src = option.doorSrc[2];

    		dObj3.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: middleSubGroupHeight,
                   	image: dObj3
                });

                subGroup3.add(doorRect)
            };

            const dObj4 = new Image();
            dObj4.src = option.doorSrc[3];

    		dObj4.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: otherSubGroupHeight,
                   	image: dObj4
                });

                subGroup4.add(doorRect)
            };

            subGroups.push(subGroup1)
            subGroups.push(subGroup2)
            subGroups.push(subGroup3)
            subGroups.push(subGroup4)
    	}
    	if(option.splitType ==  'Type8') {
    		const subGroupHeight = (doorHeight - (paddingBetweenSubGroups * 4)) / 5;

            const subGroup1 = new Konva.Group({
            	x: 0,
            	y: 0,
            	width: doorWidth,
            	height: subGroupHeight
            })

            const subGroup2 = new Konva.Group({
            	x: 0,
            	y: subGroupHeight + paddingBetweenSubGroups,
            	width: doorWidth,
            	height: subGroupHeight
            })

            const subGroup3 = new Konva.Group({
            	x: 0,
            	y: (subGroupHeight * 2) + (paddingBetweenSubGroups * 2),
            	width: doorWidth,
            	height: subGroupHeight
            })

            const subGroup4 = new Konva.Group({
            	x: 0,
            	y: (subGroupHeight * 3) + (paddingBetweenSubGroups * 3),
            	width: doorWidth,
            	height: subGroupHeight
            })

            const subGroup5 = new Konva.Group({
            	x: 0,
            	y: (subGroupHeight * 4) + (paddingBetweenSubGroups * 4),
            	width: doorWidth,
            	height: subGroupHeight
            })

            doorGroup.add(subGroup1)
            doorGroup.add(subGroup2)
            doorGroup.add(subGroup3)
            doorGroup.add(subGroup4)
            doorGroup.add(subGroup5)

              const dObj1 = new Image();
            dObj1.src = option.doorSrc[0];

            dObj1.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj1
                });

                subGroup1.add(doorRect)
            };

              const dObj2 = new Image();
            dObj2.src = option.doorSrc[1];

            dObj2.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj2
                });

                subGroup2.add(doorRect)
            };

             const dObj3 = new Image();
            dObj3.src = option.doorSrc[2];

            dObj3.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj3
                });

                subGroup3.add(doorRect)
            };

            const dObj4 = new Image();
            dObj4.src = option.doorSrc[3];

            dObj4.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj4
                });

                subGroup4.add(doorRect)
            };


             const dObj5 = new Image();
            dObj5.src = option.doorSrc[4];

            dObj5.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: subGroupHeight,
                   	image: dObj5
                });

                subGroup5.add(doorRect)
            };

            subGroups.push(subGroup1)
            subGroups.push(subGroup2)
            subGroups.push(subGroup3)
            subGroups.push(subGroup4)
            subGroups.push(subGroup5)
    	}
    	if(option.splitType == 'Type9') {
    		const otherSubGroupHeight1 = doorHeight * 0.20
    		const otherSubGroupHeight2 = doorHeight * 0.10;

    		const remainingHeight = doorHeight - (2 * otherSubGroupHeight1) - (2 * otherSubGroupHeight2) - (4 * paddingBetweenSubGroups)
    		const middleSubGroupHeight = remainingHeight

    		const subGroup1 = new Konva.Group({
    			x: 0,
    			y: 0,
    			width: doorWidth,
    			height: otherSubGroupHeight1,
    		})

    		const subGroup2 = new Konva.Group({
    			x: 0,
    			y: otherSubGroupHeight1 + paddingBetweenSubGroups,
    			width: doorWidth,
    			height: otherSubGroupHeight2
    		})

    		const subGroup3 = new Konva.Group({
    			x: 0,
    			y: otherSubGroupHeight1 + otherSubGroupHeight2 + (2 * paddingBetweenSubGroups),
    			width: doorWidth,
    			height: middleSubGroupHeight
    		})

    		const subGroup4 = new Konva.Group({
    			x: 0,
    			y: otherSubGroupHeight1 + otherSubGroupHeight2 + middleSubGroupHeight + (3 * paddingBetweenSubGroups),
    			width: doorWidth,
    			height: otherSubGroupHeight2
    		})

    		const subGroup5 = new Konva.Group({
    			x: 0,
    			y: otherSubGroupHeight1 + (2 * otherSubGroupHeight2) + middleSubGroupHeight + (4 * paddingBetweenSubGroups),
    			width: doorWidth,
    			height: otherSubGroupHeight1
    		})
    		
    		doorGroup.add(subGroup1)
    		doorGroup.add(subGroup2)
    		doorGroup.add(subGroup3)
    		doorGroup.add(subGroup4)
    		doorGroup.add(subGroup5)

    		 const dObj1 = new Image();
            dObj1.src = option.doorSrc[0];

            dObj1.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: otherSubGroupHeight1,
                   	image: dObj1
                });

                subGroup1.add(doorRect)
            };

             const dObj2 = new Image();
            dObj2.src = option.doorSrc[1];

            dObj2.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: otherSubGroupHeight2,
                   	image: dObj2
                });

                subGroup2.add(doorRect)
            };

             const dObj3 = new Image();
            dObj3.src = option.doorSrc[2];

            dObj3.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: middleSubGroupHeight,
                   	image: dObj3
                });

                subGroup3.add(doorRect)
            };

             const dObj4 = new Image();
            dObj4.src = option.doorSrc[3];

            dObj4.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: otherSubGroupHeight2,
                   	image: dObj4
                });

                subGroup4.add(doorRect)
            };

             const dObj5 = new Image();
            dObj5.src = option.doorSrc[4];

            dObj5.onload = () => {
                const doorRect = new Konva.Image({
                    x: 0,
                    y: 0,
                    width: doorWidth,
                    height: otherSubGroupHeight1,
                   	image: dObj5
                });

                subGroup5.add(doorRect)
            };
            subGroups.push(subGroup1)
            subGroups.push(subGroup2)
            subGroups.push(subGroup3)
            subGroups.push(subGroup4)
            subGroups.push(subGroup5)
    	}
    	if(this.doors[i] != undefined) {
    		if(this.doors[i].subGroups.length > 0) {
    			this.doors[i].subGroups.forEach(sg => {
    				sg.destroy()
    			})
    		}
    		this.doors[i].doorGroup.destroy()
    		this.doors[i] = {
    		doorGroup: doorGroup,
    		subGroups: subGroups
    	}
    	} else {
this.doors.push({
    		doorGroup: doorGroup,
    		subGroups: subGroups
    	})
    	}
    }

    createDoors() {
    	
        this.doors = [];
        for (let i = 0; i < this.doorNo; i++) {
        	this.doorType(i, this.doorInfo[i])
        }
    }

    changeInitialWidth(width) {
        this.initialWidth = width
        this.initialize()
    }

    changeInitialHeight(height) {
        this.initialHeight = height
        this.initialize()
    }

    changeDoorNum(no_of_doors, doorInfo)
    {
        this.doorInfo = doorInfo
        this.doorNo = no_of_doors
        this.doors = []
        this.initialize()
    }

    changeFrameSrc(frameSrc)
    {
    	this.frameSrc = frameSrc



    	 const imageObj = new Image();
        imageObj.src = this.frameSrc;

        imageObj.onload = () => {

            const background = new Konva.Image({
                x: 0,
                y: 0,
                width: this.stageWidth,
                height: this.stageHeight,
                image: imageObj
            });

            this.main_group.add(background);
        };
        this.createDoors()
    }

changeDoorSrc(imgSrc, door_num, split_num = 1, panelKey, colorKey) {
               door_num -= 1
               split_num -= 1
               this.doorInfo[door_num].doorSrc[split_num] = imgSrc
               this.doorInfo[door_num].panels[split_num].src = imgSrc
               this.doorInfo[door_num].panels[split_num].panelKey = panelKey
               this.doorInfo[door_num].panels[split_num].colorKey = colorKey
               if(this.doors[door_num] != undefined) {
               		if(this.doors[door_num].subGroups.length > 0) {
               			if(this.doors[door_num].subGroups[split_num]) {
               				const imageObj = new Image();
               				imageObj.src = imgSrc
               				imageObj.onload = () => {
               					const background = new Konva.Image({
               						x: 0,
               						y: 0,
               						width: this.doors[door_num].subGroups[split_num].width(),
               						height: this.doors[door_num].subGroups[split_num].height(),
               						image: imageObj
               					})
               					this.doors[door_num].subGroups[split_num].add(background)
               				}
               			}
               		} else {
               			const imageObj = new Image()
               			imageObj.src = imgSrc
               			imageObj.onload = () => {
               				const background = new Konva.Image({
               					x: 0,
               					y: 0,
               					width: this.doors[door_num].doorGroup.width(),
               					height: this.doors[door_num].doorGroup.height(),
               					image: imageObj
               				})
               				this.doors[door_num].doorGroup.add(background)
               			}
               		}
               }
            }



            changeDoorType(door_num, info) {
            	door_num -= 1
                this.doorInfo[door_num] = info
                this.initialize()
            }
}


$(document).ready(function () {
    let framer;
    function showLoader()
    {
        $("#waiting").removeClass('d-none')
    }
    function hideLoader()
    {
        $("#waiting").addClass('d-none')
    }
    function success_message(message)
    {
        const toastLiveExample = document.getElementById('liveToast1')
        const toastBody = toastLiveExample.querySelector('.toast-body')
        toastBody.innerHTML = message
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        setTimeout(() => {
            toastBootstrap.show()
        }, 300)
    }
    function error_message(message)
    {
        const toastLiveExample = document.getElementById('liveToast2')
        const toastBody = toastLiveExample.querySelector('.toast-body')
        toastBody.innerHTML = message
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        setTimeout(() => {
            toastBootstrap.show()
        }, 300)
    }
    function pickDoorStyleFrame(frameSrc)
    {
        $(`.panel-designer`).css({
            'background-image': 'url("' + frameSrc + '")'
        })
    }
    function pickDoorStyle(dataDoorNum, dataDoorStyle, sources, changeSwitches = true)
    {
        if(dataDoorStyle == 'Type1') {
                $(`[data-panel-designer='${dataDoorNum}']`).html(`<div data-split-num="1" class="panel-designer-btn active" 
                style="background-image: url('${sources[0]}');height: 100%"></div>`)
            }
            if(dataDoorStyle == 'Type2') {
                $(`[data-panel-designer='${dataDoorNum}']`).html(`<div data-split-num="1" class="panel-designer-btn active" 
                style="background-image: url('${sources[0]}');height: 50%"></div>
                <div data-split-num="2" class="panel-designer-btn" 
                style="background-image: url('${sources[1]}');height: 50%"></div>`)
            }
            if(dataDoorStyle == 'Type3') {
                $(`[data-panel-designer='${dataDoorNum}']`).html(`<div data-split-num="1" class="panel-designer-btn active" 
                style="background-image: url('${sources[0]}');height: 40%"></div>
                <div data-split-num="2" class="panel-designer-btn " 
                style="background-image: url('${sources[1]}');height: 20%"></div>
                <div data-split-num="3" class="panel-designer-btn " 
                style="background-image: url('${sources[2]}');height: 40%"></div>`)
            }
            if(dataDoorStyle == 'Type4') {
                const splitHeight = 100 / 3
                $(`[data-panel-designer='${dataDoorNum}']`).html(`<div data-split-num="1" class="panel-designer-btn active" 
                style="background-image: url('${sources[0]}');height: ${splitHeight}%"></div>
                <div data-split-num="2" class="panel-designer-btn " 
                style="background-image: url('${sources[1]}');height: ${splitHeight}%"></div>
                <div data-split-num="3" class="panel-designer-btn " 
                style="background-image: url('${sources[2]}');height: ${splitHeight}%"></div>
                `)
            }
            if(dataDoorStyle == 'Type5') {
                $(`[data-panel-designer='${dataDoorNum}']`).html(`<div data-split-num="1" class="panel-designer-btn active" 
                style="background-image: url('${sources[0]}');height: 20%"></div>
                <div data-split-num="2" class="panel-designer-btn" 
                style="background-image: url('${sources[1]}');height: 60%"></div>
                <div data-split-num="3" class="panel-designer-btn" 
                style="background-image: url('${sources[2]}');height: 20%"></div>`)
            }
            if(dataDoorStyle == 'Type6') {
                $(`[data-panel-designer='${dataDoorNum}']`).html(`<div data-split-num="1" class="panel-designer-btn active" 
                style="background-image: url('${sources[0]}');height: 25%"></div>
                <div data-split-num="2" class="panel-designer-btn" 
                style="background-image: url('${sources[1]}');height: 25%"></div>
                <div data-split-num="3" class="panel-designer-btn" 
                style="background-image: url('${sources[2]}');height: 25%"></div>
                <div data-split-num="4" class="panel-designer-btn" 
                style="background-image: url('${sources[3]}');height: 25%"></div>`)
            }
            if(dataDoorStyle == 'Type7') {
                $(`[data-panel-designer='${dataDoorNum}']`).html(`<div data-split-num="1" class="panel-designer-btn active" 
                style="background-image: url('${sources[0]}');height: 30%"></div>
                <div data-split-num="2" class="panel-designer-btn" 
                style="background-image: url('${sources[1]}');height: 20%"></div>
                <div data-split-num="3" class="panel-designer-btn" 
                style="background-image: url('${sources[2]}');height: 20%"></div>
                <div data-split-num="4" class="panel-designer-btn" 
                style="background-image: url('${sources[3]}');height: 30%"></div>`)
            }
            if(dataDoorStyle == 'Type8') {
                $(`[data-panel-designer='${dataDoorNum}']`).html(`<div data-split-num="1" class="panel-designer-btn active" 
                style="background-image: url('${sources[0]}');height: 20%"></div>
                <div data-split-num="2" class="panel-designer-btn" 
                style="background-image: url('${sources[1]}');height: 20%"></div>
                <div data-split-num="3" class="panel-designer-btn" 
                style="background-image: url('${sources[2]}');height: 20%"></div>
                <div data-split-num="4" class="panel-designer-btn" 
                style="background-image: url('${sources[3]}');height: 20%"></div>
                <div data-split-num="5" class="panel-designer-btn" 
                style="background-image: url('${sources[4]}');height: 20%"></div>`)
            }
            if(dataDoorStyle == 'Type9') {
                $(`[data-panel-designer='${dataDoorNum}']`).html(`<div data-split-num="1" class="panel-designer-btn active" 
                style="background-image: url('${sources[0]}');height: 20%"></div>
                <div data-split-num="2" class="panel-designer-btn" 
                style="background-image: url('${sources[1]}');height: 10%"></div>
                <div data-split-num="3" class="panel-designer-btn" 
                style="background-image: url('${sources[2]}');height: 40%"></div>
                <div data-split-num="4" class="panel-designer-btn" 
                style="background-image: url('${sources[3]}');height: 10%"></div>
                <div data-split-num="5" class="panel-designer-btn" 
                style="background-image: url('${sources[4]}');height: 20%"></div>`)
            }
            if (changeSwitches == true) {
                $(`.swatches-panel-split[data-door-num='${dataDoorNum}']`).fadeOut()
                $(`.swatches-panel-split[data-door-num='${dataDoorNum}'][data-panel-split='1']`).fadeIn()
            }
    }
    async function frameStyleHtml()
    {
        const response = await fetch('./frame_style.php?loadSwatches=1');
        return await response.text()
    }
    async function doorStyleHtml(doorNum)
    {
        const frameSrc = $(`input[name=track_color]:checked`).attr('data-src')
        const response = await fetch('./door_style.php?doorNum='+doorNum+'&frameSrc='+frameSrc);
        return await response.text()
    }
    async function loadSwatches() {
        const response = await fetch('./swatches.json')
        return await response.json();
    }
    loadSwatches().then(Swatches => {
        const PANELS = Swatches.PANELS
        const PROFILES = Swatches.PROFILES
        const ADDITIONS = Swatches.ADDITIONS
        const MOCK = {}
        function determinePanelHeight(opening_height, splitType)
        {
            let panels = []
            if(splitType == 'Type1') {
                panels.push(opening_height)
            }
            if(splitType == 'Type2') {
                const subGroupHeight =opening_height / 2
                panels.push(subGroupHeight)
                panels.push(subGroupHeight)
            }
            if(splitType == 'Type3') {
                const middleSubGroupHeight = opening_height * 0.20;
                const remainingGroupHeight = opening_height - middleSubGroupHeight
                panels.push(remainingGroupHeight)
                panels.push(middleSubGroupHeight)
                panels.push(remainingGroupHeight)
            }
            if(splitType == 'Type4') {
                const subGroupHeight =opening_height / 3
                panels.push(subGroupHeight)
                panels.push(subGroupHeight)
                panels.push(subGroupHeight)
            }
            if(splitType == 'Type5') {
                const otherSubGroupHeight = opening_height * 0.20;
                const remainingGroupHeight = opening_height - (otherSubGroupHeight * 2)
                panels.push(otherSubGroupHeight)
                panels.push(remainingGroupHeight)
                panels.push(otherSubGroupHeight)
            }
            if(splitType == 'Type6') {
                const subGroupHeight =opening_height / 4
                panels.push(subGroupHeight)
                panels.push(subGroupHeight)
                panels.push(subGroupHeight)
                panels.push(subGroupHeight)
            }
            if(splitType == 'Type7') {
                const middleSubGroupHeight = opening_height * 0.20;
                const remainingHeight = opening_height - (2 * middleSubGroupHeight)
                const otherSubGroupHeight = remainingHeight / 2
                panels.push(otherSubGroupHeight)
                panels.push(middleSubGroupHeight)
                panels.push(middleSubGroupHeight)
                panels.push(otherSubGroupHeight)
            }
            if(splitType == 'Type8') {
                const subGroupHeight =opening_height / 5
                panels.push(subGroupHeight)
                panels.push(subGroupHeight)
                panels.push(subGroupHeight)
                panels.push(subGroupHeight)
                panels.push(subGroupHeight)
            }
            if(splitType == 'Type9') {
                const otherSubGroupHeight1 = opening_height * 0.20
                const otherSubGroupHeight2 = opening_height * 0.10;
                const remainingHeight = opening_height - (2 * otherSubGroupHeight1) - (2 * otherSubGroupHeight2)
                const middleSubGroupHeight = remainingHeight
                panels.push(otherSubGroupHeight1)
                panels.push(otherSubGroupHeight2)
                panels.push(middleSubGroupHeight)
                panels.push(otherSubGroupHeight2)
                panels.push(otherSubGroupHeight1)
            }
            return panels
        }
        function orderPricing()
        {
            const ORDER = []
            const TRACK_SUMMARY = []
            const DOOR_SUMMARY = []
            const ADDONS_SUMMARY = []
            let total_price = 0
            let track_price = 0
            let door_price = 0
            let midrails_price = 0 
            let panels_price = 0
            let additional_color_price = 0
            let additional_qty_price = 0
            let additional_price = 0
            let MIDRAIL_PRICING = {}
            let TRACK_PRICING = {}
            let DOOR_PRICING = {}
            let PANEL_COLOR_PRICING = []
            let ADDITION_PRICING = []
            const opening_width = !isNaN(parseFloat(MOCK.width)) ? parseFloat(MOCK.width) : 0  
            opening_height =$('input[name=opening_height]').val(),
             frame_options4 =$('input[name=frame_options4]:checked').val(),
             frame_options5 =$('input[name=frame_options5]:checked').val(),
            frame_option_index = 0
             var frameHtml='';
             if(MOCK.track.profileKey==4  ){
                frameHtml+=' - '+frame_options4
                frame_option_index = $('input[name=frame_options4]:checked').attr('data-index')
             }
              if(MOCK.track.profileKey==5  ){
                frameHtml+=' - '+frame_options5
            frame_option_index = $('input[name=frame_options5]:checked').attr('data-index')
             }
            const doorNum = MOCK.doors.doorNo ?? 0 
            const overlap_num = doorNum - 1
            for (let d = 0; d < doorNum; d++) {
                DOOR_SUMMARY.push({
                    "DESCRIPTION": "DOOR " + (d+1) + " ",
                    "QTY": 1,
                    "PRICE": 0,
                    "TOTAL": 0
                })
            }
            let overlap = 0
            if(MOCK.track) {
                if(MOCK.track.colorKey && MOCK.track.profileKey && MOCK.track.trackKey) {
                    if(PROFILES[MOCK.track.profileKey].TRACKS[MOCK.track.trackKey]) {
                        console.log(PROFILES[MOCK.track.profileKey])
                        overlap = PROFILES[MOCK.track.profileKey].OVERLAP[frame_option_index]
                        TRACK_SUMMARY.push({
                            "DESCRIPTION": 'Frame & Track Set Style: ' + PROFILES[MOCK.track.profileKey].NAME + ' - ' + PROFILES[MOCK.track.profileKey].TRACKS[MOCK.track.trackKey].COLORS[MOCK.track.colorKey].NAME + frameHtml,
                            "QTY": 1,
                            "PRICE": 0,
                            "TOTAL": 0
                        })
                        DOOR_PRICING = PROFILES[MOCK.track.profileKey].TRACKS[MOCK.track.trackKey].DOORS
                        MIDRAIL_PRICING = PROFILES[MOCK.track.profileKey].TRACKS[MOCK.track.trackKey].MIDRAILS
                        TRACK_PRICING = PROFILES[MOCK.track.profileKey].TRACKS[MOCK.track.trackKey].PRICES
                    }
                }
            }
            const door_width = (opening_width + (overlap * overlap_num)) / doorNum 
            if(MOCK.doors.doorNo > 0) {
                for (let d = 0; d < MOCK.doors.doorNo; d++) {
                    let color_count = 0
                    if(MOCK.doors.info[d].splitType && MOCK.doors.info[d].panels) {
                        let count_midrails = 0
                        let count_panels = 0
                        if(MOCK.doors.info[d].splitType == 'Type1') {
                            DOOR_SUMMARY[d].DESCRIPTION = DOOR_SUMMARY[d].DESCRIPTION + " - " + " 1 Panel Style 1 "
                            count_panels = 0
                        }
                        if(MOCK.doors.info[d].splitType == 'Type2') {
                            DOOR_SUMMARY[d].DESCRIPTION = DOOR_SUMMARY[d].DESCRIPTION + " - " + " 2 Panel Style 2 "
                            count_panels = 1
                        }
                        if(MOCK.doors.info[d].splitType == 'Type3') {
                            DOOR_SUMMARY[d].DESCRIPTION = DOOR_SUMMARY[d].DESCRIPTION + " - " + " 3 Panel Style 3 "
                            count_panels = 2
                        }
                        if(MOCK.doors.info[d].splitType == 'Type4') {
                            DOOR_SUMMARY[d].DESCRIPTION = DOOR_SUMMARY[d].DESCRIPTION + " - " + " 3 Panel Style 4 "
                            count_panels = 2
                        }
                        if(MOCK.doors.info[d].splitType == 'Type5') {
                            DOOR_SUMMARY[d].DESCRIPTION = DOOR_SUMMARY[d].DESCRIPTION + " - " + " 3 Panel Style 5 "
                            count_panels = 2
                        }
                        if(MOCK.doors.info[d].splitType == 'Type6') {
                            DOOR_SUMMARY[d].DESCRIPTION = DOOR_SUMMARY[d].DESCRIPTION + " - " + " 4 Panel Style 6 "
                            count_panels = 3
                        }
                        if(MOCK.doors.info[d].splitType == 'Type7') {
                            DOOR_SUMMARY[d].DESCRIPTION = DOOR_SUMMARY[d].DESCRIPTION + " - " + " 4 Panel Style 7 "
                            count_panels = 3
                        }
                        if(MOCK.doors.info[d].splitType == 'Type8') {
                            DOOR_SUMMARY[d].DESCRIPTION = DOOR_SUMMARY[d].DESCRIPTION + " - " + " 5 Panel Style 8 "
                            count_panels = 4
                        }
                        if(MOCK.doors.info[d].splitType == 'Type9') {
                            DOOR_SUMMARY[d].DESCRIPTION = DOOR_SUMMARY[d].DESCRIPTION + " - " + " 5 Panel Style 9 "
                            count_panels = 4
                        }
                        if(MOCK.doors.info[d].splitType == 'Type2') {
                            count_midrails = 1
                        }
                        if(MOCK.doors.info[d].splitType == 'Type3' || MOCK.doors.info[d].splitType == 'Type4' || MOCK.doors.info[d].splitType == 'Type5') {
                            count_midrails = 2
                        }
                        if(MOCK.doors.info[d].splitType == 'Type6' || MOCK.doors.info[d].splitType == 'Type7') {
                            count_midrails = 3
                        }
                        if(MOCK.doors.info[d].splitType == 'Type8' || MOCK.doors.info[d].splitType == 'Type9') {
                            count_midrails = 4
                        }
                        let midrail = 0
                        if(count_midrails > 0) {
                            midrail = 1
                        }
                        const panel_sizes = determinePanelHeight(opening_height, MOCK.doors.info[d].splitType)
                        MOCK.doors.info[d].panels.forEach((panel, index) => {
                            if(index <= count_panels) {
                                const panel_size = panel_sizes[index]
                                if(panel.panelKey && panel.colorKey) {
                                    PANELS[panel.panelKey].PRICES.forEach(price => {
                                        if(price.PRICE_GROUP == PANELS[panel.panelKey].COLORS[panel.colorKey].PRICE_GROUP) {
                                            let desc = DOOR_SUMMARY[d].DESCRIPTION + " - " + PANELS[panel.panelKey].COLORS[panel.colorKey].NAME
                                            if(MOCK.doors.info[d].splitType == 'Type1' && color_count < 1) {
                                                DOOR_SUMMARY[d].DESCRIPTION = desc
                                                color_count++   
                                            }
                                            if(MOCK.doors.info[d].splitType == 'Type2' && color_count < 2) {
                                                DOOR_SUMMARY[d].DESCRIPTION = desc
                                                color_count++   
                                            }
                                            if(MOCK.doors.info[d].splitType == 'Type3' && color_count < 3) {
                                                DOOR_SUMMARY[d].DESCRIPTION = desc
                                                color_count++   
                                            }
                                            if(MOCK.doors.info[d].splitType == 'Type4' && color_count < 3) {
                                                DOOR_SUMMARY[d].DESCRIPTION = desc
                                                color_count++   
                                            }
                                            if(MOCK.doors.info[d].splitType == 'Type5' && color_count < 3) {
                                                DOOR_SUMMARY[d].DESCRIPTION = desc
                                                color_count++   
                                            }
                                            if(MOCK.doors.info[d].splitType == 'Type6' && color_count < 4) {
                                                DOOR_SUMMARY[d].DESCRIPTION = desc
                                                color_count++   
                                            }
                                            if(MOCK.doors.info[d].splitType == 'Type7' && color_count < 4) {
                                                DOOR_SUMMARY[d].DESCRIPTION = desc
                                                color_count++   
                                            }
                                            if(MOCK.doors.info[d].splitType == 'Type8' && color_count < 5) {
                                                DOOR_SUMMARY[d].DESCRIPTION = desc
                                                color_count++   
                                            }
                                            if(MOCK.doors.info[d].splitType == 'Type9' && color_count < 5) {
                                                DOOR_SUMMARY[d].DESCRIPTION = desc
                                                color_count++   
                                            }
                                            PANEL_COLOR_PRICING.push({
                                                "DoorNum": d + 1,
                                                "Midrail": midrail,
                                                "MidrailNum": count_midrails,
                                                "PanelSize": parseInt(panel_size),
                                                "PanelWidth": door_width,
                                                "PanelType": MOCK.doors.info[d].splitType,
                                                "PriceGroup": PANELS[panel.panelKey].COLORS[panel.colorKey].PRICE_GROUP,
                                                "PRICING": price
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            }
            if(MOCK.additions_color) {
                if(MOCK.additions_color.length > 0) {
                    MOCK.additions_color.forEach(addon => {
                        if(addon.size > 0 && addon.additionKey && addon.colorKey) {
                            ADDITION_PRICING.push({
                                SIZE: parseInt(addon.size),
                                TYPE: "COLOR",
                                PRICE: ADDITIONS[addon.additionKey].COLORS[addon.colorKey].PRICE   
                            })
                            ADDONS_SUMMARY.push({
                                "DESCRIPTION": ADDITIONS[addon.additionKey].GROUP + " - " + ADDITIONS[addon.additionKey].COLORS[addon.colorKey].NAME,
                                "QTY": parseInt(addon.size),
                                "PRICE": ADDITIONS[addon.additionKey].COLORS[addon.colorKey].PRICE,
                                "TOTAL": ADDITIONS[addon.additionKey].COLORS[addon.colorKey].PRICE * parseInt(addon.size) 
                            })
                        }
                    })
                }
            }
            if(MOCK.additions_qty) {
                if(MOCK.additions_qty.length > 0) {
                        MOCK.additions_qty.forEach(addon => {
                        if(addon.qty > 0 && addon.additionKey) {
                            ADDITION_PRICING.push({
                                SIZE: parseInt(addon.qty),
                                TYPE: "QTY",
                                PRICE: ADDITIONS[addon.additionKey].PRICE
                            })
                            ADDONS_SUMMARY.push({
                                "DESCRIPTION": ADDITIONS[addon.additionKey].GROUP,
                                "QTY": parseInt(addon.qty),
                                "PRICE": ADDITIONS[addon.additionKey].PRICE,
                                "TOTAL": ADDITIONS[addon.additionKey].PRICE * parseInt(addon.qty)
                            })
                        }
                    })
                }
            }
            let previous_track_size = null
            TRACK_PRICING.SIZES.forEach(track_size => {
                if(opening_width <= track_size.SIZE && (previous_track_size == null || previous_track_size > track_size.SIZE))  {
                    track_price = track_size.PRICE
                    previous_track_size = track_size.SIZE 
                }
            })
            TRACK_SUMMARY[0].PRICE = track_price
            TRACK_SUMMARY[0].TOTAL = track_price
            let previous_door_size = null 
            DOOR_PRICING.SIZES.forEach(door_size => {
                if(door_width <= door_size.SIZE && (previous_door_size == null || previous_door_size > door_size.SIZE)) {
                    door_price = door_size.PRICE 
                    previous_door_size = door_size.SIZE
                }
            })
            for (let d = 0; d < doorNum; d++) {
                DOOR_SUMMARY[d].PRICE = door_price 
                DOOR_SUMMARY[d].TOTAL = door_price
            }
            door_price = door_price * doorNum
            for (let d = 0; d < doorNum; d++) {
                let count_midrails = 0
                if(MOCK.doors.info[d].splitType == 'Type2') {
                    count_midrails = 1
                }
                if(MOCK.doors.info[d].splitType == 'Type3' || MOCK.doors.info[d].splitType == 'Type4' || MOCK.doors.info[d].splitType == 'Type5') {
                    count_midrails = 2
                }
                if(MOCK.doors.info[d].splitType == 'Type6' || MOCK.doors.info[d].splitType == 'Type7') {
                    count_midrails = 3
                }
                if(MOCK.doors.info[d].splitType == 'Type8' || MOCK.doors.info[d].splitType == 'Type9') {
                    count_midrails = 4
                }
                let previous_midrail_size = null
                let midrail_price = 0
                if(count_midrails > 0) {
                    MIDRAIL_PRICING.SIZES.forEach(size => {
                        if(door_width <= size.SIZE && (previous_midrail_size == null || previous_midrail_size > size.SIZE)) {
                            midrail_price = size.PRICE * count_midrails
                            previous_midrail_size = size.SIZE 
                        }
                    })
                }
                DOOR_SUMMARY[d].PRICE = DOOR_SUMMARY[d].PRICE + midrail_price
                DOOR_SUMMARY[d].TOTAL = DOOR_SUMMARY[d].TOTAL + midrail_price
                midrails_price += midrail_price
            }
            PANEL_COLOR_PRICING.forEach(panel  => {
                if(panel.PRICING.PRICE_GROUP == panel.PriceGroup) {
                    let previous_track_height = null
                    let panel_price = 0
                    panel.PRICING.HEIGHTS.forEach(height => {
                        if(height.MIDRAIL == panel.Midrail && panel.PanelSize <= height.MAX && (previous_track_height == null || previous_track_height > height.MAX)) {
                        
                            let previous_panel_size = null 
                            height.SIZES.forEach(size => {
                                if(panel.PanelWidth <= size.SIZE && (previous_panel_size == null || previous_panel_size > size.SIZE)) {
                                    panel_price = size.PRICE
                                    previous_panel_size = size.SIZE
                                }
                            })
                        }
                    })
                    if(panel.PRICING.EXTRA == true) {
                        DOOR_SUMMARY[panel.DoorNum - 1].PRICE = DOOR_SUMMARY[panel.DoorNum - 1].PRICE + panel_price 
                        DOOR_SUMMARY[panel.DoorNum - 1].TOTAL = DOOR_SUMMARY[panel.DoorNum - 1].TOTAL + panel_price
                        panels_price += panel_price
                    }
                }
            })
            ADDITION_PRICING.forEach(addon => {
                if(addon.TYPE == 'COLOR') {
                    additional_color_price += (addon.SIZE * addon.PRICE)
                }
                if(addon.TYPE == 'QTY') {
                    additional_qty_price += (addon.SIZE * addon.PRICE)
                }
            })

            additional_price = additional_color_price + additional_qty_price 
            total_price = track_price + door_price + panels_price + midrails_price + additional_price


            $("#total_price").html(`Total: £${total_price.toFixed(2)}`)
            ORDER.push(...TRACK_SUMMARY, ...DOOR_SUMMARY, ...ADDONS_SUMMARY)
            let html = `
            <div class="row">
                <div class="col-md-12">
                    <h4>SUMMARY</h4>
                    <hr>
                </div>
                <div class="col-md-12">
                    <p style="font-size: 0.85rem">Opening Size: ${parseInt(opening_width)}mm & ${parseInt(opening_height)}mm</p>
                </div>
                <div class="col-md-12">
                    <table class="table table-bordered table-sm" data-bs-theme="dark">
                        <thead>
                            <tr>
                                <th class="text-nowrap">Description</th>
                                <th class="text-nowrap">Price</th>
                                <th class="text-nowrap">Quantity</th>
                                <th class="text-nowrap">Total Cost</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">`
            ORDER.forEach(O => {
                html += `
                    <tr>
                        <td>${O.DESCRIPTION}</td>
                        <td>£${parseFloat(O.PRICE).toFixed(2)}</td>
                        <td>${O.QTY}</td>
                        <td class="text-end">£${parseFloat(O.TOTAL).toFixed(2)}</td>
                    </tr>
                `
            })
            html += `
                <tr>
                    <td colspan="3" class="text-end">Total Price</td>
                    <td class="text-end"><strong class="text-app">£${total_price.toFixed(2)}</strong></td>
                </tr>
                        </tbody>
                    </table>
                </div>

                <div class="col-md-12 text-end mb-3">
                <button class="btn btn-danger btn btn-danger reset-configuration rounded-0 text-uppercase">Clear Sections</button>
                </div>
            </div>
            `
            $("#summary").html(html)
        }
        const minWidth = 800
        const maxWidth = 4880
        const minHeight = 600
        const maxHeight = 2440
        const minDoor = 2
        const maxDoor = 6
        $("input[name=opening_width]").TouchSpin({
            min: minWidth,
            max: maxWidth,
            step: 1
        })

        $("input[name=opening_height]").TouchSpin({
            min: minHeight,
            max: maxHeight,
            step: 1
        })

        $("input[name=amount_of_doors]").TouchSpin({
            min: minDoor,
            max: maxDoor,
            step: 1,
        })
        const TABS = ['#pills-sizing-information-tab', '#pills-no-of-doors-tab', '#pills-frame-style-tab', '#pills-door-style-tab', '#pills-extra-options-tab', '#pills-summary-tab']
        let 
        currentForm = 0,
        initialWidth = parseFloat($('input[name=opening_width]').val()),
        initialDoors = parseInt($('input[name=amount_of_doors]').val()),
        initialHeight =2440,
        initialSrc = './'+$(`input[name=track_color]:checked`).attr('data-src')
        initialProfileKey = $(`input[name=track_color]:checked`).attr('data-profile-key')
        initialTrackKey = $(`input[name=track_color]:checked`).attr('data-track-key')
        initialColorKey = $(`input[name=track_color]:checked`).attr('data-color-key')
        MOCK.track = {
            profileKey: initialProfileKey,
            trackKey: initialTrackKey,
            colorKey: initialColorKey
        }
        $("#pills-tab .nav-link").on('click', function () {
            currentForm = TABS.indexOf('#'+$(this).attr('id'))
            if(currentForm == TABS.length - 1) {
                $("#next-form").html('<span>ADD TO BASKET</span>')
            } else {
                $("#next-form").html(`<span>Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg>`)
            }
        })
        $("#next-form").on('click', function () {
            if(currentForm + 1 <= TABS.length - 1) {
                currentForm += 1
                $(TABS[currentForm]).click()
                $("#previous-form").prop('disabled', false)
                if(currentForm == TABS.length - 1) {
                    $("#next-form").html('<span>ADD TO BASKET</span>')
                } else {
                    $("#next-form").html(`<span>Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg>`)
                }
            }    
        })
        $("#previous-form").on('click', function () {
            if(currentForm - 1 >= 0) {
                currentForm -= 1
                $(TABS[currentForm]).click()
                if(currentForm == 0) {
                    $("#previous-form").prop('disabled', true)
                }
                $("#next-form").html(`<span>Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg>`)
            }
        })
        $("#pills-tab .nav-item .nav-link").on('click', function () {
            const FormNum = parseInt($(this).attr('data-id'))
            if(FormNum === 0) {
                $("#previous-form").prop('disabled', true)
            }
            currentForm = FormNum
        })
        function initializeConfiguration (response) {
            $("#door_style").html(response)
            setTimeout(() => {
                const info = []
                 for (let i = 1; i <= initialDoors; i++) {
                     const initialDoorType = $(`.panel-style.active[data-door-num='${i}']`).attr('data-door-style')
                     const sources = []
                     const panels = []
                     for (let s = 1; s <= 5; s++) {
                        const initialDoorSrc = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-src')
                        const initialPanelKey = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-panel-key')
                        const initialColorKey = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-color-key')
                        sources.push(initialDoorSrc)
                        panels.push({
                            src: initialDoorSrc,
                            panelKey: initialPanelKey,
                            colorKey: initialColorKey
                        })
                     }
                     info.push({
                         doorSrc:  sources,
                         splitType: initialDoorType,
                        panels: panels
                     })
                     let dHtml = `<div data-split-num="1" class="panel-designer-btn active" style="background-image: url('./${sources[0]}');height: 100%"></div>`
                    $(`[data-panel-designer='${i}']`).html(dHtml)
                    $(`[data-panel-designer='all']`).html(dHtml)
                 } 
                 framer = new Framer({
                     containerId: 'container',
                     minWidth: minWidth,
                     maxWidth: maxWidth,
                     minHeight: minHeight,
                     maxHeight: maxHeight,
                     initialWidth: initialWidth,
                     initialHeight: initialHeight,
                     frameSrc: initialSrc,
                     doors: {
                         doorNo: initialDoors,
                         minDoor: minDoor,
                         maxDoor: maxDoor,
                         info: info
                     }
                 })
                 MOCK.width = initialWidth 
                MOCK.height = initialHeight 
                MOCK.doors = {
                    doorNo: initialDoors,
                    info: info,
                }
                orderPricing()
                hideLoader()
             }, 300)
        }
        doorStyleHtml(initialDoors).then(function (response) {
            initializeConfiguration(response)
        }).catch(error => console.log(error))
        $(document).on('click', '.reset-configuration', function () {
            $('input[name=opening_width]').val(initialWidth)
            $('input[name=amount_of_doors]').val(initialDoors)
            $('input[name=opening_height]').val(initialHeight)
            MOCK.track = {
                profileKey: initialProfileKey,
                trackKey: initialTrackKey,
                colorKey: initialColorKey
            }
            frameStyleHtml().then(function (track_response) {
                $("#frame_style").html(track_response)
                doorStyleHtml(initialDoors).then(function (door_response) {
                    initializeConfiguration(door_response)
                    $("select[name=addition_color]").val(0).trigger('change')
                    $("select[name=addition_qty]").val(0).trigger('change')
                }).catch(error => console.log(error))
                
                
            })

            $('#pills-summary').removeClass('active show');
               $('#pills-summary-tab').removeClass('active show');
            $('#pills-sizing-information').addClass('active show');
            $('#pills-sizing-information-tab').addClass('active show');
            $('a[href="#pills-sizing-information-tab"]').tab('show');  

        })
        
        $(document).on('change', 'input[name=opening_height]', function () {
         opening_height = !isNaN(parseFloat($(this).val())) ? parseFloat($(this).val()) : 0
          
           // framer.changeInitialHeight(opening_height)
            MOCK.height = opening_height
            orderPricing()
        })
        $(document).on('change', 'input[name=opening_width]', function () {
            const opening_width = !isNaN(parseFloat($(this).val())) ? parseFloat($(this).val()) : 0
            const door_width = maxWidth / maxDoor
            let doorNum = 2
            let amount_of_doors = 2
            while (doorNum <= maxDoor) {
                if(opening_width >= (door_width * doorNum)) {
                    amount_of_doors = doorNum
                }
                doorNum++
            }
            $('input[name=amount_of_doors]').val(amount_of_doors)
            
            doorStyleHtml(amount_of_doors).then(function (response) {
            $("#door_style").html(response)

                setTimeout(() => {
                    const info = []
                    for (let i = 1; i <= amount_of_doors; i++) {
                        const initialDoorType = $(`.panel-style.active[data-door-num='${i}']`).attr('data-door-style')
                        const sources = []
                        const panels = []
                        for (let s = 1; s <= 5; s++) {
                            const initialDoorSrc = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-src')
                            const initialPanelKey = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-panel-key')
                            const initialColorKey = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-color-key')
                            sources.push(initialDoorSrc)
                            panels.push({
                                src: initialDoorSrc,
                                panelKey: initialPanelKey,
                                colorKey: initialColorKey
                            })
                        }
                        pickDoorStyle(i, initialDoorType, sources)
                        info.push({
                            doorSrc:  sources,
                            splitType: initialDoorType,
                            panels: panels
                        })
                        let dHtml = `<div data-split-num="1" class="panel-designer-btn active" style="background-image: url('./${sources[0]}');height: 100%"></div>`
                        $(`[data-panel-designer='all']`).html(dHtml)
                    } 
                    framer.changeInitialWidth(opening_width)
                    framer.changeDoorNum(amount_of_doors, info)
                    MOCK.width = opening_width
             MOCK.doors = {
                doorNo: amount_of_doors,
                info: info
             }
             orderPricing()
                }, 300)

            }).catch(error => console.log(error))
        })

        $(document).on('change', 'input[name=amount_of_doors]', function () {
            const doors_entered = parseInt($(this).val())
            const opening_width = !isNaN(parseFloat($('input[name=opening_width]').val())) ? parseFloat($('input[name=opening_width]').val()) : 0
            const door_width = opening_width / maxDoor //maxWidth /maxDoor
            // let doorNum = 1
            // let amount_of_doors = 1
            // while (doorNum <= maxDoor) {
            //     if(opening_width > (door_width * doorNum)) {
            //         amount_of_doors = doorNum
            //     }
            //     doorNum++
            // }
            // $(this).val(amount_of_doors)
            if(door_width * doors_entered > opening_width) {
                error_message("You cannot enter moure then " + maxDoor + "")
            }
            // if(doors_entered !== amount_of_doors) {
            //     error_message("Max " + amount_of_doors + " no doors is set")
            // }
            amount_of_doors = doors_entered
            doorStyleHtml(amount_of_doors).then(function (response) {
                $("#door_style").html(response)
                setTimeout(() => {
                    const info = []
                    for (let i = 1; i <= amount_of_doors; i++) {
                        const initialDoorType = $(`.panel-style.active[data-door-num='${i}']`).attr('data-door-style')
                        const sources = []
                        const panels = []
                        for (let s = 1; s <= 5; s++) {
                            const initialDoorSrc = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-src')
                            const initialPanelKey = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-panel-key')
                            const initialColorKey = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-color-key')
                            sources.push(initialDoorSrc)
                            panels.push({
                                src: initialDoorSrc,
                                panelKey: initialPanelKey,
                                colorKey: initialColorKey
                            })
                        }
                        pickDoorStyle(i, initialDoorType, sources)
                        info.push({
                            doorSrc:  sources,
                            splitType: initialDoorType,
                            panels: panels
                        })
                        let dHtml = `<div data-split-num="1" class="panel-designer-btn active" style="background-image: url('./${sources[0]}');height: 100%"></div>`
                        $(`[data-panel-designer='all']`).html(dHtml)
                    }
                    framer.changeInitialWidth(opening_width)
                    framer.changeDoorNum(amount_of_doors, info)
                    MOCK.width = opening_width
                    MOCK.doors = {
                        doorNo: amount_of_doors,
                        info: info
                    }
                    orderPricing()
                }, 300)
            }).catch(error => console.log(error))
        })

        $(document).on('click', '.panel-designer-btn', function () {
            const doorNum = $(this).parent().attr('data-panel-designer')
            const splitNum = $(this).attr('data-split-num')
            $(`[data-panel-designer='${doorNum}'] .panel-designer-btn`).removeClass('active')
            $(`[data-panel-designer='${doorNum}'] .panel-designer-btn[data-split-num='${splitNum}']`).addClass('active')
            $(`.swatches-panel-split[data-door-num='${doorNum}']`).fadeOut()
            $(`.swatches-panel-split[data-door-num='${doorNum}'][data-panel-split='${splitNum}']`).fadeIn()
        })

        $(document).on('click', '.panel-style', function () {
            const dataDoorNum = $(this).attr('data-door-num')
            const dataDoorStyle = $(this).attr('data-door-style')
            $(`.panel-style[data-door-num='${dataDoorNum}']`).removeClass('active')
            $(this).addClass('active')
            if (dataDoorNum == 'all') {
                const amount_of_doors = parseInt($(`input[name=amount_of_doors]`).val())
                for (let i = 1; i <= amount_of_doors; i++) {
                    const sources = []
                    const panels = []
                    for (let s = 1; s <= 5; s++) {
                        const initialDoorSrc = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-src')
                        const initialPanelKey = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-panel-key')
                        const initialColorKey = $(`input[name=panel_color_${i}_${s}]:checked`).attr('data-color-key')
                        sources.push(initialDoorSrc)
                        panels.push({
                            src: initialDoorSrc,
                            panelKey: initialPanelKey,
                            colorKey: initialColorKey
                        })
                    }
                    framer.changeDoorType(i, {
                        doorSrc:  sources,
                        splitType: dataDoorStyle,
                        panels: panels
                    })
                    pickDoorStyle(i, dataDoorStyle, sources, false)
                    pickDoorStyle(dataDoorNum, dataDoorStyle, sources, i == amount_of_doors ? true : false)
                    MOCK.doors.info[i-1] = {
                        doorSrc:  sources,
                        splitType: dataDoorStyle,
                        panels: panels
                    }
                    $(`.panel-style[data-door-num='${i}']`).removeClass('active')
                    $(`.panel-style[data-door-num='${i}'][data-door-style='${dataDoorStyle}']`).addClass('active')
                }
            } else {
                const sources = []
                const panels = []
                for (let s = 1; s <= 5; s++) {
                    const initialDoorSrc = $(`input[name=panel_color_${dataDoorNum}_${s}]:checked`).attr('data-src')
                    const initialPanelKey = $(`input[name=panel_color_${dataDoorNum}_${s}]:checked`).attr('data-panel-key')
                    const initialColorKey = $(`input[name=panel_color_${dataDoorNum}_${s}]:checked`).attr('data-color-key')
                    sources.push(initialDoorSrc)
                    panels.push({
                        src: initialDoorSrc,
                        panelKey: initialPanelKey,
                        colorKey: initialColorKey
                    })
                }
                framer.changeDoorType(dataDoorNum, {
                    doorSrc:  sources,
                    splitType: dataDoorStyle,
                    panels: panels
                })

                pickDoorStyle(dataDoorNum, dataDoorStyle, sources)
                MOCK.doors.info[dataDoorNum-1] = {
                    doorSrc:  sources,
                    splitType: dataDoorStyle,
                    panels: panels
                }
            }
            orderPricing()
        })

        $(document).on('change', '.panel_color', function () {
            const dataSrc = $(this).attr('data-src')
            const dataPanelKey = $(this).attr('data-panel-key')
            const dataDoorNum = $(this).attr('data-door-num')
            const dataPanelSplit = $(this).attr('data-panel-split')
            const dataColorKey = $(this).attr('data-color-key')
            $(`[data-panel-designer='${dataDoorNum}'] .panel-designer-btn[data-split-num='${dataPanelSplit}']`).css({'background-image' : "url('./"+dataSrc+"')"})
            if(dataDoorNum == 'all') {
                const amount_of_doors = parseInt($(`input[name=amount_of_doors]`).val())
                for (let i = 1; i <= amount_of_doors; i++) {
                    $(`[data-panel-designer='${i}'] .panel-designer-btn[data-split-num='${dataPanelSplit}']`).css({'background-image' : "url('./"+dataSrc+"')"})
                    framer.changeDoorSrc('./'+dataSrc, i, dataPanelSplit, dataPanelKey, dataColorKey)
                    MOCK.doors.info[i-1].doorSrc[dataPanelSplit-1] = dataSrc
                    MOCK.doors.info[i-1].panels[dataPanelSplit-1].src = dataSrc
                    MOCK.doors.info[i-1].panels[dataPanelSplit-1].panelKey = dataPanelKey
                    MOCK.doors.info[i-1].panels[dataPanelSplit-1].colorKey = dataColorKey 
                    $(`.panel_color[data-door-num='${i}'][data-panel-split='${dataPanelSplit}'][data-panel-key='${dataPanelKey}'][data-color-key='${dataColorKey}']`).prop('checked', true)
                }
            } else {
                framer.changeDoorSrc('./'+dataSrc, dataDoorNum, dataPanelSplit, dataPanelKey, dataColorKey)
                MOCK.doors.info[dataDoorNum-1].doorSrc[dataPanelSplit-1] = dataSrc
                MOCK.doors.info[dataDoorNum-1].panels[dataPanelSplit-1].src = dataSrc
                MOCK.doors.info[dataDoorNum-1].panels[dataPanelSplit-1].panelKey = dataPanelKey
                MOCK.doors.info[dataDoorNum-1].panels[dataPanelSplit-1].colorKey = dataColorKey 
            }
            orderPricing()
        })

        $(document).on('change', 'input[name=track_profile]', function () {
            const dataProfileKey = $(this).attr('data-profile-key')
            $(`input[name=track_color][data-profile-key='${dataProfileKey}'][data-track-key='0'][data-color-key='0']`).prop('checked', true)
            const src = $(`input[name=track_color]:checked`).attr('data-src')
            framer.changeFrameSrc('./'+src)
            MOCK.track = {
                profileKey: dataProfileKey,
                trackKey: 0,
                colorKey: 0
            }
            orderPricing()
        })

        
        $(document).on('change', 'input[name=frame_options4]', function () {
            $("input[name=frame_options5]").prop('checked',false)
            const dataProfileKey = $(this).attr('data-profile-key')
            $(`input[name=track_color][data-profile-key='${dataProfileKey}'][data-track-key='0'][data-color-key='0']`).prop('checked', true).trigger('change')
                  orderPricing()
       })
   $(document).on('change', 'input[name=frame_options5]', function () {
    $("input[name=frame_options4]").prop('checked',false)
    const dataProfileKey = $(this).attr('data-profile-key')
            $(`input[name=track_color][data-profile-key='${dataProfileKey}'][data-track-key='0'][data-color-key='0']`).prop('checked', true).trigger('change')
                  orderPricing()
       })
        $(document).on('change', 'input[name=track_color]', function () {
            const dataProfileKey = $(this).attr('data-profile-key')
            const dataTrackKey = $(this).attr('data-track-key')
            const dataColorKey = $(this).attr('data-color-key')
            $(`input[name=track_profile][data-profile-key='${dataProfileKey}']`).prop('checked', true)
            const src = $(this).attr('data-src')
            pickDoorStyleFrame(src)
            framer.changeFrameSrc('./'+src)
            MOCK.track = {
                profileKey: dataProfileKey,
                trackKey: dataTrackKey,
                colorKey: dataColorKey
            }
            if(dataProfileKey==4 ){
                if(!$('input[name=frame_options4]').is(":checked")) {
                    $('input[name=frame_options4][value="300a"]').prop('checked',1)
                }
                $('input[name=frame_options5]').prop('checked',false)
            }
            if(dataProfileKey==5 ){
                if(!$('input[name=frame_options5]').is(":checked")) {
                    $('input[name=frame_options5][value="640"]').prop('checked',1)
                }
                $('input[name=frame_options4]').prop('checked',false)
            }
            orderPricing()
        })
        $(document).on('change', 'select[name=addition_color]', function () {
            MOCK.additions_color = []
            const additions_color = []
            $('select[name=addition_color]').each(function () {
                const size = parseInt($(this).val())
                const dataAdditionKey = $(this).attr('data-addition-key')
                const dataColorKey = $(this).attr('data-color-key')
                additions_color.push({
                    size: size,
                    additionKey: dataAdditionKey,
                    colorKey: dataColorKey
                })
            })
            MOCK.additions_color = additions_color
            orderPricing()
        })
        $(document).on('change', 'select[name=addition_qty]', function () {
            MOCK.additions_qty = []
            const additions_qty = []
            $('select[name=addition_qty]').each(function () {
                const qty = parseInt($(this).val())
                const dataAdditionKey = $(this).attr('data-addition-key')
                additions_qty.push({
                    qty: qty,
                    additionKey: dataAdditionKey
                })
            })
            MOCK.additions_qty = additions_qty 
            orderPricing()
        })
        
   })
})