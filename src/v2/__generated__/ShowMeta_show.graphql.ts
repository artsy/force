/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowMeta_show = {
    readonly name: string | null;
    readonly slug: string;
    readonly metaDescription: string | null;
    readonly metaImage: {
        readonly src: string | null;
    } | null;
    readonly " $refType": "ShowMeta_show";
};
export type ShowMeta_show$data = ShowMeta_show;
export type ShowMeta_show$key = {
    readonly " $data"?: ShowMeta_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowMeta_show">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowMeta_show",
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
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "metaDescription",
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "metaImage",
      "plural": false,
      "selections": [
        {
          "alias": "src",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "large"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"large\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
(node as any).hash = 'd46144fbf4488e2c24c393ca5fd8d678';
export default node;
