/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureMeta_feature = {
    readonly slug: string;
    readonly meta: {
        readonly name: string;
        readonly description: string;
        readonly image: string | null;
    };
    readonly " $refType": "FeatureMeta_feature";
};
export type FeatureMeta_feature$data = FeatureMeta_feature;
export type FeatureMeta_feature$key = {
    readonly " $data"?: FeatureMeta_feature$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FeatureMeta_feature">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureMeta_feature",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FeatureMeta",
      "kind": "LinkedField",
      "name": "meta",
      "plural": false,
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
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "image",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Feature",
  "abstractKey": null
};
(node as any).hash = 'bea3dc26975fdc2c539c9faefaa78e6f';
export default node;
