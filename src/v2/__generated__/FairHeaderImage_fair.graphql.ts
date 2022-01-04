/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeaderImage_fair = {
    readonly image: {
        readonly url: string | null;
    } | null;
    readonly " $refType": "FairHeaderImage_fair";
};
export type FairHeaderImage_fair$data = FairHeaderImage_fair;
export type FairHeaderImage_fair$key = {
    readonly " $data"?: FairHeaderImage_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairHeaderImage_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairHeaderImage_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "wide"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"wide\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair"
};
(node as any).hash = '40752f782c9a021ce3c61024afab0962';
export default node;
