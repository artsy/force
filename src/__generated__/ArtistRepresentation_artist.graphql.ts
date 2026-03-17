/**
 * @generated SignedSource<<8d0b6d458eb384a9622f6524b0ada6af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistRepresentation_artist$data = {
  readonly verifiedRepresentatives: ReadonlyArray<{
    readonly partner: {
      readonly href: string | null | undefined;
      readonly internalID: string;
      readonly name: string | null | undefined;
      readonly profile: {
        readonly icon: {
          readonly _1x: {
            readonly src: string;
          } | null | undefined;
          readonly _2x: {
            readonly src: string;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined;
    };
  }>;
  readonly " $fragmentType": "ArtistRepresentation_artist";
};
export type ArtistRepresentation_artist$key = {
  readonly " $data"?: ArtistRepresentation_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistRepresentation_artist">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistRepresentation_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "VerifiedRepresentative",
      "kind": "LinkedField",
      "name": "verifiedRepresentatives",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Partner",
          "kind": "LinkedField",
          "name": "partner",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
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
              "kind": "ScalarField",
              "name": "href",
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
                      "alias": "_1x",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 45
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 45
                        }
                      ],
                      "concreteType": "CroppedImageUrl",
                      "kind": "LinkedField",
                      "name": "cropped",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": "cropped(height:45,width:45)"
                    },
                    {
                      "alias": "_2x",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 90
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 90
                        }
                      ],
                      "concreteType": "CroppedImageUrl",
                      "kind": "LinkedField",
                      "name": "cropped",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": "cropped(height:90,width:90)"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "19f0b6583f5e0f5ebe45539b80b2879f";

export default node;
