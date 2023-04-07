import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { GetPredictions } from "../src/cli/GetPredictions";

const argv = yargs(hideBin(process.argv))
  .option("network", {
    description:
      "Network to relay on(string). e.g: Arbitrum/Avalanche/Binance/Ethereum/Optimism/Polygon",
    type: "string",
    required: false,
    default: "Binance",
  })
  .option("address", {
    description:
      "address for the prediction service(string), must be encode. e.g: 0x0000000...",
    type: "string",
    required: true,
  })
  .help()
  .alias("help", "h")
  .parserConfiguration({
    "parse-numbers": false,
  })
  .parseSync();

const loopxAbi = [
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId_",
        type: "uint16",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "PredictionFeedNotFound",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "sequenceNumber",
        type: "uint64",
      },
    ],
    name: "BatchPredictionFeedUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "entityAddress",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "entityType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "publishTime",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "tags",
        type: "string[]",
      },
      {
        indexed: false,
        internalType: "int64",
        name: "reputationScore",
        type: "int64",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "modelID",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "modelName",
        type: "string",
      },
    ],
    name: "PredictionFeedUpdate",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "entityAddress",
        type: "string",
      },
    ],
    name: "getPredictionFeed",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "entityAddress",
            type: "string",
          },
          {
            internalType: "enum LoopXStructs.Entity",
            name: "entity",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "string[]",
                name: "tags",
                type: "string[]",
              },
              {
                internalType: "uint64",
                name: "publishTime",
                type: "uint64",
              },
              {
                internalType: "int64",
                name: "reputationScore",
                type: "int64",
              },
            ],
            internalType: "struct LoopXStructs.Prediction",
            name: "prediction",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "modelID",
                type: "uint8",
              },
              {
                internalType: "string",
                name: "modelName",
                type: "string",
              },
            ],
            internalType: "struct LoopXStructs.Model",
            name: "model",
            type: "tuple",
          },
        ],
        internalType: "struct LoopXStructs.PredictionFeed",
        name: "predictionFeed",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "updateData",
        type: "bytes[]",
      },
    ],
    name: "updatePredictionFeeds",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const main = async () => {
  const updateCli = new GetPredictions(argv.network, JSON.stringify(loopxAbi));
  updateCli.getPredictionFeeds(argv.address);
  console.log("get suc.");
};
main();
