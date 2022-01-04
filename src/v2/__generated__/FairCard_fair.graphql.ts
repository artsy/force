/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairCard_fair = {
    readonly name: string | null;
    readonly image: {
        readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "FairCard_fair";
};
export type FairCard_fair$data = FairCard_fair;
export type FairCard_fair$key = {
    readonly " $data"?: FairCard_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairCard_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairCard_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
              "name": "height",
              "value": 512
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": "wide"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 768
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "src",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:512,version:\"wide\",width:768)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair"
};
(node as any).hash = 'd8b252f0329c98b0410991b54b861208';
export default node;
