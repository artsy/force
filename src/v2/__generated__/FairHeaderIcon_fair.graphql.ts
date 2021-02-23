/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeaderIcon_fair = {
    readonly name: string | null;
    readonly profile: {
        readonly icon: {
            readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "FairHeaderIcon_fair";
};
export type FairHeaderIcon_fair$data = FairHeaderIcon_fair;
export type FairHeaderIcon_fair$key = {
    readonly " $data"?: FairHeaderIcon_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairHeaderIcon_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairHeaderIcon_fair",
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
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "icon",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 100
                },
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "square140"
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 100
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
              "storageKey": "cropped(height:100,version:\"square140\",width:100)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair"
};
(node as any).hash = '4ffeffd6976b0a735690e9ef9bd7122e';
export default node;
