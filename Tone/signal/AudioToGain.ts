import { ToneAudioNodeOptions } from "../core/context/ToneAudioNode";
import { SignalOperator } from "./SignalOperator";
import { WaveShaper } from "./WaveShaper";

/**
 * AudioToGain converts an input in AudioRange [-1,1] to NormalRange [0,1].
 * See {@link GainToAudio}.
 *
 * @example
 * var a2g = new AudioToGain();
 */
export class AudioToGain extends SignalOperator<ToneAudioNodeOptions> {

	name = "AudioToGain";

	/**
	 * The node which converts the audio ranges
	 */
	private _norm = new WaveShaper({
		context: this.context,
		mapping: x => (x + 1) / 2,
	});
	protected _internalChannels = [this._norm];

	/**
	 * The AudioRange input [-1, 1]
	 */
	input = this._norm;

	/**
	 * The GainRange output [0, 1]
	 */
	output = this._norm;

	/**
	 *  clean up
	 */
	dispose(): this {
		super.dispose();
		this._norm.dispose();
		return this;
	}
}
