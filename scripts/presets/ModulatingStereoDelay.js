import { IS_Effect } from "infinitesibling";

export class ModulatingStereoDelay extends IS_Effect
{
    constructor(siblingContext)
    {
        super(siblingContext);

        let IS = siblingContext;

        let delay = IS.createStereoDelay();

        let delayModulatorBuffer = IS.createBuffer();
        delayModulatorBuffer.noise().amplitude(0.004).add();

        let delayModulatorBuffer2 = IS.createBuffer();
        delayModulatorBuffer2.noise().amplitude(0.004).add();

        let delayModulator = IS.createBufferSource(delayModulatorBuffer);
        delayModulator.connect(delay.delayTimeLeft);
        delayModulator.playbackRate = IS.randomFloat(0.00025, 0.000125) * 0.5;
        delayModulator.loop = true;

        let delayModulator2 = IS.createBufferSource(delayModulatorBuffer);
        delayModulator2.connect(delay.delayTimeRight);
        delayModulator2.playbackRate = IS.randomFloat(0.00025, 0.000125) * 0.5;
        delayModulator2.loop = true;

        this.delay = delay;
        this.delayModulator = delayModulator;
        this.delayModulator2 = delayModulator2;

        this.configureInput(this.delay);
        this.configureOutput(this.delay);
    }

    start()
    {
        this.delayModulator.start();
        this.delayModulator2.start();
    }
}