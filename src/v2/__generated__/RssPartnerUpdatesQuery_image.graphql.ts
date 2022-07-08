/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RssPartnerUpdatesQuery_image = {
    readonly image: {
        readonly caption: string | null;
        readonly resized: {
            readonly width: number | null;
            readonly height: number | null;
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "RssPartnerUpdatesQuery_image";
};
export type RssPartnerUpdatesQuery_image$data = RssPartnerUpdatesQuery_image;
export type RssPartnerUpdatesQuery_image$key = {
    readonly " $data"?: RssPartnerUpdatesQuery_image$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RssPartnerUpdatesQuery_image">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RssPartnerUpdatesQuery_image",
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
          "args": null,
          "kind": "ScalarField",
          "name": "caption",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "width",
              "value": 500
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            },
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
          "storageKey": "resized(width:500)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleImageSection",
  "abstractKey": null
};
(node as any).hash = 'd4e6b588cf375aef269108de80a4e0ad';
export default node;
