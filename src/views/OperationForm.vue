<template>
  <BaseDrawer show @close="$router.go(-1)">
    <form v-if="isOperationCreated" class="operation-form">
      <div class="operation-form__content">
        <h1 class="operation-form__title">Добавление операции</h1>

        <OperationFieldDescription :field="field" />

        <div class="operation-form__value">
          <BaseSelect
            label="Операция"
            :options="options"
            :model-value="operation.type"
            @update:modelValue="operation.type = +$event"
          />
        </div>

        <div class="operation-form__date-area">
          <BaseDatepicker
            label="Дата проведения"
            placeholder="Задайте"
            input-format="dd.MM.yyyy"
            :model-value="operationDate"
            @update:modelValue="onChangeDate"
          />

          <BaseInput
            v-model="operation.area"
            label="Кол-во га к обработке"
            placeholder="Задайте"
          />
        </div>

        <div class="operation-form__comment">
          <BaseTextarea
            v-model="operation.comment"
            placeholder="Комментарий к операции ..."
          />
        </div>

        <OperationQualitySwitcher
          v-model="operation.assessment"
          class="operation-form__switcher"
          :quality-list="qualityLists"
        />
      </div>

      <BaseButton
        theme="green"
        class="operation-form__submit"
        type="button"
        @click="onAddOrUpdateOperation"
      >
        {{ $route.params.id ? 'Изменить опреацию' : 'добавить операцию' }}
      </BaseButton>
    </form>
  </BaseDrawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  Assessment,
  OperationCompletedType,
  OperationType,
} from '@/types/operation';

import { Field, QualityItem } from '@/types/operation';
import { OptionsList } from '@/types';
import { ActionTypes } from '@/store/operation/actions';
import { TDate } from '@/classes/models/TDate';
import { Operation } from '@/classes/models/Operation';

import { enumKeys } from '@/helpers';
import { fieldService } from '@/api';
import { locale } from '@/locales/ru';
import { useStore } from '@/store';
import { routesList } from '@/router/routes';

import BaseButton from '@/components/base/BaseButton.vue';
import BaseDrawer from '@/components/base/BaseDrawer.vue';
import BaseDatepicker from '@/components/base/BaseDatepicker.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';

import OperationFieldDescription from '@/components/operation-form/OperationFieldDescription.vue';
import OperationQualitySwitcher from '@/components/operation-form/OperationQualitySwitcher.vue';

const field: Field = {
  fieldId: 112,
  subtitle: 'Победа 50',
  image: '/example.png',
  crop: 'Пшеница озимая',
};

const qualityLists: Array<QualityItem> = [
  {
    name: locale[Assessment[Assessment.EXCELLENT]],
    assessment: Assessment.EXCELLENT,
  },
  {
    name: locale[Assessment[Assessment.SATISFACTORILY]],
    assessment: Assessment.SATISFACTORILY,
  },
  {
    name: locale[Assessment[Assessment.BADLY]],
    assessment: Assessment.BADLY,
  },
];

const createOperation = (args: Partial<Operation> = {}) => {
  return new Operation({
    type: OperationType.PLOWING,
    date: new TDate({ year: 2021, month: 3, day: 4 }),
    area: 10,
    comment: 'test',
    assessment: Assessment.EXCELLENT,
    completed: OperationCompletedType.COMPLETED,

    ...args,
  });
};

export default defineComponent({
  name: 'OperationForm',
  components: {
    BaseButton,
    BaseDrawer,
    BaseTextarea,
    BaseInput,
    BaseDatepicker,
    BaseSelect,
    OperationFieldDescription,
    OperationQualitySwitcher,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const operation = ref({} as Operation);

    const { dispatch, state } = useStore();

    const options = computed(() => {
      const res = [] as OptionsList;

      for (const value of enumKeys(OperationType)) {
        res.push({
          label: locale[value],
          value: OperationType[value],
        });
      }

      return res;
    });

    const operationDate = computed(() => {
      const { day, month, year } = operation.value.date;

      return new Date(year, month - 1, day);
    });

    const isOperationCreated = computed(() => {
      if (!operation.value) {
        return false;
      }

      return Object.keys(operation.value).length;
    });

    onMounted(async () => {
      const { id } = route.params;
      const params = {
        completed: state.operation.operationsType,
      };

      if (!id) {
        operation.value = createOperation(params);
        return;
      }

      const res = await fieldService.getOperation(id as string);

      operation.value = res || createOperation(params);
    });

    const onAddOrUpdateOperation = async () => {
      await dispatch(ActionTypes.ADD_OR_UPDATE_OPERATION, operation.value);
      router.push(routesList.operations.path);
    };

    const onChangeDate = (date: Date) => {
      operation.value.date = new TDate({
        year: date.getFullYear(),
        day: date.getDate(),
        month: date.getMonth() + 1,
      });
    };

    return {
      field,
      qualityLists,
      operation,
      options,
      operationDate,
      isOperationCreated,

      onAddOrUpdateOperation,
      onChangeDate,
    };
  },
});
</script>

<style scoped lang="scss">
.operation-form {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px 0 0;

  &__title {
    @include padding-form-lr;

    margin-bottom: 14px;
    font-size: $font-size-6;
    font-weight: $font-bold;
  }

  &__value {
    @include padding-form-lr;

    margin-top: 16px;
  }

  &__date-area {
    @include padding-form-lr;

    display: flex;
    margin-top: 12px;
  }

  &__comment {
    @include padding-form-lr;

    padding-top: 14px;
    margin-top: 16px;
    border-top: 1px solid $color-grey-2;

    textarea {
      height: 100px;
    }
  }

  &__switcher {
    margin-top: 50px;
  }

  &__submit {
    height: 60px;
    margin-top: auto;
  }
}
</style>
