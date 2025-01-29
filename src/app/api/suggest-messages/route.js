export const dynamic = "force-dynamic";

import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";

// Create a new Hugging Face Inference instance
const Hf = new HfInference(process.env.HF_TOKEN);

export async function POST(req) {
	try {
		// Extract the prompt from the body of the request
		const prompt =
			"Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

		// Generate a response using Hugging Face Inference
		const response = await Hf.textGenerationStream({
			model: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
			inputs: `<|prompter|>${prompt}<|endoftext|><|assistant|>`,
			parameters: {
				max_new_tokens: 200,
				typical_p: 0.2,
				repetition_penalty: 1,
				truncate: 1000,
				return_full_text: false,
			},
		});

		// Convert the response into a friendly text-stream
		const stream = HuggingFaceStream(response);

		// Respond with the stream
		return new StreamingTextResponse(stream);
	} catch (error) {
		console.error("Error processing the request:", error.message);

		// Return an error response
		return new Response(
			JSON.stringify({
				error: "Failed to generate a response. Please try again later.",
			}),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}
